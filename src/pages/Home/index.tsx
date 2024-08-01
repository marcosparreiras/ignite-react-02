import { useForm } from "react-hook-form";
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
  const form = useForm();

  function handleNewCycle(data: any) {
    console.log(data);
  }

  const task = form.watch("task");

  return (
    <HomeContainer>
      <form onSubmit={form.handleSubmit(handleNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInputContainer
            list="task-suggestions"
            placeholder="De um nome para o seu projeto"
            id="task"
            {...form.register("task")}
          />
          <datalist id="task-suggestions">
            <option value="projeto 01" />
            <option value="projeto 02" />
            <option value="projeto 03" />
            <option value="projeto 04" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInputContainer
            {...form.register("minutesAmount", { valueAsNumber: true })}
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

        <StartCountDownButtonContainer disabled={!task} type="submit">
          <Play size={24} /> Começar
        </StartCountDownButtonContainer>
      </form>
    </HomeContainer>
  );
}
