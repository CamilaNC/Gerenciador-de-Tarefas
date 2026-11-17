# Gerenciador de Tarefas

Aplicação web para gestão de tarefas com renderização do lado do servidor (SSR). Desenvolvida com Next.js App Router e tRPC para demonstrar comunicação tipada entre frontend e backend.

## Tecnologias Utilizadas

* Next.js (App Router)
* React
* tRPC
* TypeScript

## Funcionalidades Principais

* Server-Side Rendering (SSR): Os dados iniciais são carregados diretamente no servidor para uma renderização instantânea, sem telas de carregamento.
* Operações CRUD: Criação, leitura, atualização e exclusão de tarefas.
* Validação de Interface: Prevenção de envio de formulários vazios e bloqueio de botões durante o processamento.
* Feedback ao Usuário: Alertas visuais para sucessos e erros em todas as operações com o banco de dados.

## Estrutura do Código

* src/server/bd.ts: Banco de dados simulado em memória e regras do Crud.
* src/app/page.tsx: Componente de servidor que busca os dados e os injeta na tela (garantindo o SSR).
* src/app/gerenciadorClient.tsx: Componente de cliente responsável por toda a interatividade, botões e estados.
* src/trpc/: Configurações de comunicação entre o front-end e o back-end.

## Como Executar o Projeto

1. Certifique-se de ter o Node.js instalado na sua máquina.
2. Abra o terminal na pasta raiz do projeto e instale as dependências:
   npm install

3. Inicie o servidor de desenvolvimento:
   npm run dev

4. Acesse no navegador:
   http://localhost:3000