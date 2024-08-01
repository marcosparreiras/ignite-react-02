import {
  HistoryContainer,
  HistoryListContainer,
  StatusContainer,
} from "./styles";

export function History() {
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
            <tr>
              <td>projeto 02</td>
              <td>40 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <StatusContainer statusColor="green">Concluido</StatusContainer>
              </td>
            </tr>
            <tr>
              <td>projeto 02</td>
              <td>40 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <StatusContainer statusColor="green">Concluido</StatusContainer>
              </td>
            </tr>
            <tr>
              <td>projeto 02</td>
              <td>40 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <StatusContainer statusColor="green">Concluido</StatusContainer>
              </td>
            </tr>

            <tr>
              <td>projeto 02</td>
              <td>40 minutos</td>
              <td>Há 2 meses</td>
              <td>
                <StatusContainer statusColor="green">Concluido</StatusContainer>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryListContainer>
    </HistoryContainer>
  );
}
