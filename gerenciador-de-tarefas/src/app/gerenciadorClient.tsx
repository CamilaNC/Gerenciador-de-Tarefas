"use client";

import { useState } from "react";
import { trpc } from "../trpc/client";

export default function GerenciadorClient({ tarefasIniciais }: { tarefasIniciais: any[] }) {
  const utils = trpc.useUtils(); 
  
  const { data: tarefas, isLoading } = trpc.listarTarefas.useQuery(undefined, {
    initialData: tarefasIniciais,
  });

  const criarTarefa = trpc.criarTarefa.useMutation({
    onSuccess: () => {
      utils.listarTarefas.invalidate(); 
      setTitulo("");
      setDescricao("");
      alert("Sucesso: Tarefa adicionada!");
    },
    onError: () => {
      alert("Erro: Ocorreu um problema ao salvar a nova tarefa.");
    }
  });
  const deletarTarefa = trpc.deletarTarefa.useMutation({
    onSuccess: () => {
      utils.listarTarefas.invalidate();
      alert("Sucesso: Tarefa apagada permanentemente!"); 
    },
    onError: () => {
      alert("Erro: Não foi possível apagar a tarefa.");
    }
  });

  const atualizarTarefa = trpc.atualizarTarefa.useMutation({
    onSuccess: () => {
      utils.listarTarefas.invalidate();
      setTarefaEditando(null); 
      alert("Sucesso: Tarefa atualizada!");
    },
    onError: () => {
      alert("Erro: Não foi possível atualizar a tarefa.");
    }
  });

  const [telaAtual, setTelaAtual] = useState<"menu" | "adicionar" | "ver" | "deletar">("menu");

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const [tarefaEditando, setTarefaEditando] = useState<string | number | null>(null);
  const [novoTituloEditado, setNovoTituloEditado] = useState("");
  const [novaDescricaoEditada, setNovaDescricaoEditada] = useState("");

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Gerenciador de Tarefas</h1>

      {telaAtual === "menu" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "200px" }}>
          <button onClick={() => setTelaAtual("adicionar")}>Adicionar Tarefas</button>
          <button onClick={() => setTelaAtual("ver")}>Ver Tarefas</button>
          <button onClick={() => setTelaAtual("deletar")}>Deletar Tarefas</button>
        </div>
      )}

      {telaAtual === "adicionar" && (
        <div>
          <button onClick={() => setTelaAtual("menu")}>Voltar</button>
          <h2>Adicionar</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "300px" }}>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" />
            <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
            <button onClick={() => criarTarefa.mutate({ titulo, descricao })} disabled={!titulo || criarTarefa.isPending}>
              Salvar
            </button>
          </div>
        </div>
      )}

      {telaAtual === "ver" && (
        <div>
          <button onClick={() => setTelaAtual("menu")}>Voltar</button>
          <h2>Tarefas</h2>
          {isLoading ? <p>Carregando...</p> : (
            <ul>
              {tarefas?.map((t) => (
                <li key={t.id} style={{ marginBottom: "20px" }}>
                  {tarefaEditando === t.id ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "300px" }}>
                      <input type="text" value={novoTituloEditado} onChange={(e) => setNovoTituloEditado(e.target.value)} />
                      <input type="text" value={novaDescricaoEditada} onChange={(e) => setNovaDescricaoEditada(e.target.value)} />
                      <div>
                        <button onClick={() => atualizarTarefa.mutate({ id: t.id, titulo: novoTituloEditado, descricao: novaDescricaoEditada })}>Salvar</button>
                        <button onClick={() => setTarefaEditando(null)}>Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <strong>{t.titulo}</strong>
                      {t.dataCriacao && <span style={{ fontSize: "12px", color: "#666", marginLeft: "10px" }}>Criado em:{new Date(Number(t.dataCriacao)).toLocaleString("pt-BR")}</span>}
                      <p>{t.descricao || "Sem descrição"}</p>
                      <button onClick={() => { setTarefaEditando(t.id); setNovoTituloEditado(t.titulo); setNovaDescricaoEditada(t.descricao || ""); }}>
                        Editar
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {telaAtual === "deletar" && (
        <div>
          <button onClick={() => setTelaAtual("menu")}>Voltar</button>
          <h2>Deletar</h2>
          {isLoading ? <p>Carregando...</p> : (
            <ul>
              {tarefas?.map((t) => (
                <li key={t.id} style={{ marginBottom: "20px" }}>
                  <strong>{t.titulo}</strong>
                  {t.dataCriacao && <span style={{ fontSize: "12px", color: "#666", marginLeft: "10px" }}>Criado em:{new Date(Number(t.dataCriacao)).toLocaleString("pt-BR")}</span>}
                  <p>{t.descricao || "Sem descrição"}</p>
                  <button onClick={() => deletarTarefa.mutate({ id: t.id })} disabled={deletarTarefa.isPending}>
                    Apagar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}