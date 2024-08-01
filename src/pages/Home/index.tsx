import { Play } from "phosphor-react";
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInputContainer,
  SeparatorContainer,
  StartCountDownButtonContainer,
  TaskInputContainer,
} from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInputContainer
            list="task-suggestions"
            placeholder="De um nome para o seu projeto"
            id="task"
          />
          <datalist id="task-suggestions">
            <option value="projeto 01" />
            <option value="projeto 02" />
            <option value="projeto 03" />
            <option value="projeto 04" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInputContainer
            placeholder="00"
            type="number"
            max={60}
            min={0}
            step={1}
            id="minutesAmount"
          />
          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <SeparatorContainer>:</SeparatorContainer>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButtonContainer type="submit">
          <Play size={24} /> Começar
        </StartCountDownButtonContainer>
      </form>
    </HomeContainer>
  );
}
