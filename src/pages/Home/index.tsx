import { HandPalm, Play } from "phosphor-react";
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  StartCountDownButtonContainer,
  StopCountDownButtonContainer,
} from "./styles";
import { createContext, useState } from "react";

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
}

export const CyclesContext = createContext<CyclesContextType>({});

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

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
    form.reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={form.handleSubmit(handleNewCycle)}>
        <CyclesContext.Provider value={{ activeCycle }}>
          <FormContainer />
          <CountDownContainer />
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
