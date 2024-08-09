import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle?: Cycle;
  amountSecondsPassed: number;
  startNewCycle: (cycle: Cycle) => void;
  markActiveCycleAsFineshed: () => void;
  interruptActiveCycle: () => void;
  updateAmountSecondsPassed: (secondsPassed: number) => void;
}

export const CyclesContext = createContext<CyclesContextType>(
  {} as CyclesContextType
);

export function CyclesContextProvider({ children }: PropsWithChildren) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function startNewCycle(cycle: Cycle) {
    setCycles((prev) => [...prev, cycle]);
    setActiveCycleId(cycle.id);
    setAmountSecondsPassed(0);
  }

  function updateAmountSecondsPassed(secondsPassed: number) {
    setAmountSecondsPassed(secondsPassed);
  }

  function markActiveCycleAsFineshed() {
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
  }

  function interruptActiveCycle() {
    setCycles((prev) =>
      prev.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          };
        }
        return cycle;
      })
    );
    setActiveCycleId(null);
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        markActiveCycleAsFineshed,
        amountSecondsPassed,
        updateAmountSecondsPassed,
        startNewCycle,
        interruptActiveCycle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}

export function useCyclesContext(): CyclesContextType {
  const context = useContext(CyclesContext);
  return context;
}
