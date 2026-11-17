import GerenciadorClient from "./gerenciadorClient";
import { tarefa } from "../server/bd"; 

export default function Page() {
  return <GerenciadorClient tarefasIniciais={tarefa} />;
}