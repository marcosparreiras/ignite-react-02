import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountDownButtonContainer,
  StopCountDownButtonContainer,
} from "./styles";
import { createContext, useState } from "react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewCycleForm } from "./NewCycleForm";
import { CountDown } from "./CountDown";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  inteeruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  activeCycle?: Cycle;
  markCurrentActiveCycleAsFineshed: () => void;
  amountSecondsPassed: number;
  updateAmountSecondsPassed: (secondsPassed: number) => void;
}

export const CyclesContext = createContext<CyclesContextType>(
  {} as CyclesContextType
);

const newCycleValidationSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutesAmount: z.coerce
    .number()
    .min(0, "O ciclo precisa ser no minimo de 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});

export type NewCycleFormData = z.infer<typeof newCycleValidationSchema>;

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const task = newCycleForm.watch("task");

  function updateAmountSecondsPassed(secondsPassed: number) {
    setAmountSecondsPassed(secondsPassed);
  }

  function markCurrentActiveCycleAsFineshed() {
    setCycles((prev) =>
      prev.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            finishedDate: new Date(),
          };
        }
        return cycle;
      })
    );
    setActiveCycleId(null);
    newCycleForm.reset();
  }

  function handleNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    setCycles((prev) => [...prev, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);
  }

  function handleInterruptCycle(
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    setCycles((prev) =>
      prev.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            inteeruptedDate: new Date(),
          };
        }
        return cycle;
      })
    );
    setActiveCycleId(null);
    newCycleForm.reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={newCycleForm.handleSubmit(handleNewCycle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            markCurrentActiveCycleAsFineshed,
            amountSecondsPassed,
            updateAmountSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />
        </CyclesContext.Provider>
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
