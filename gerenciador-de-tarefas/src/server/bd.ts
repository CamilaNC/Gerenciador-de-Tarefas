import { TRPCError } from '@trpc/server';
import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';
import { router, publicProcedure } from './trpc';
import { z } from 'zod';

type Tarefa = {
  id: number;
  titulo: string;
  descricao?: string;
  dataCriacao: Timestamp;
};

export let tarefa: Tarefa[]= [];
let proximoId = 1;

export const appRouter = router({

    listarTarefas: publicProcedure.query(() => {
    try{
      return tarefa;
      
    }catch (erro){
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Não foi possível carregar a lista de tarefas',
      });
    }
  }),

    criarTarefa: publicProcedure .input(z.object({
        titulo: z.string().min(1,"A tarefa precisa ter um título"),
        descricao: z.string().optional(),
    }))
    .mutation(({ input }) => {
      try{
        const novaTarefa = {
          id: proximoId++, 
          titulo: input.titulo,
          descricao: input.descricao,
          dataCriacao: Date.now() as Timestamp,
        };
        
        tarefa.push(novaTarefa);
        return novaTarefa;

      }catch (erro){
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Não foi possível salvar a tarefa no banco de dados.',
        });
      }
    }),

    atualizarTarefa: publicProcedure .input(z.object({
        id: z.number(),
        titulo: z.string().min(1).optional(),
        descricao: z.string().optional(),
    }))
    .mutation(({input}) => {
        try{
            const index = tarefa.findIndex((t) => t.id === input.id);
            if (index !==-1){
                if(input.titulo !== undefined){
                    tarefa[index].titulo = input.titulo;
                }
                if(input.descricao !== undefined){
                    tarefa[index].descricao = input.descricao;
                }

            }
            return tarefa[index];
        }catch(erro){
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Não foi possível atualizar a tarefa'
            });
        }

    }),

    deletarTarefa: publicProcedure .input(z.object({
        id: z.number(),
    }))
    .mutation(({input})=> {
        try{
        tarefa = tarefa.filter((t) => t.id !==input.id);
        return{ sucesso: true};
        }catch(erro){
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Não foi possível deletar a tarefa'
            });

        }

    }),
    
})

export type AppRouter = typeof appRouter;