import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountDownButtonContainer,
  StopCountDownButtonContainer,
} from "./styles";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewCycleForm } from "./NewCycleForm";
import { CountDown } from "./CountDown";
import { useCyclesContext } from "../../contexts/CyclesContext";
import type { Cycle } from "../../reducers/cycles";

const newCycleValidationSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutesAmount: z.coerce
    .number()
    .min(0, "O ciclo precisa ser no minimo de 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});

export type NewCycleFormData = z.infer<typeof newCycleValidationSchema>;

export function Home() {
  const { activeCycle, startNewCycle, interruptActiveCycle } =
    useCyclesContext();

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const task = newCycleForm.watch("task");

  function handleNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    startNewCycle(newCycle);
  }

  function handleInterruptCycle(
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    interruptActiveCycle();
    newCycleForm.reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={newCycleForm.handleSubmit(handleNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
          <CountDown />
        </FormProvider>
        {activeCycle ? (
          <StopCountDownButtonContainer
            onClick={handleInterruptCycle}
            type="button"
          >
            <HandPalm size={24}>Interromper</HandPalm>
          </StopCountDownButtonContainer>
        ) : (
          <StartCountDownButtonContainer disabled={!task} type="submit">
            <Play size={24} /> Começar
          </StartCountDownButtonContainer>
        )}
      </form>
    </HomeContainer>
  );
}
