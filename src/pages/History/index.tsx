import { useCyclesContext } from "../../contexts/CyclesContext";
import { formatDistanceToNow } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import {
  HistoryContainer,
  HistoryListContainer,
  StatusContainer,
} from "./styles";

export function History() {
  const { cycles } = useCyclesContext();

  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>
      <HistoryListContainer>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.length > 0 &&
              cycles.map((cycle) => (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                      locale: ptBr,
                    } as any)}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <StatusContainer statusColor="green">
                        Concluído
                      </StatusContainer>
                    )}
                    {cycle.interruptedDate && (
                      <StatusContainer statusColor="red">
                        Interrompido
                      </StatusContainer>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <StatusContainer statusColor="yellow">
                        Em andamento
                      </StatusContainer>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </HistoryListContainer>
    </HistoryContainer>
  );
}
