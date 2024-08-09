import {
  createContext,
  useContext,
  useReducer,
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

type Action =
  | {
      type: "ADD_NEW_CYCLE";
      payload: { data: Cycle };
    }
  | {
      type: "MARK_ACTIVE_CYCLE_AS_FINESHED" | "INTERRUPT_ACTIVE_CYCLE";
      payload: { data: string };
    };

export function CyclesContextProvider({ children }: PropsWithChildren) {
  const [cycles, dispatch] = useReducer((state: Cycle[], action: Action) => {
    switch (action.type) {
      case "ADD_NEW_CYCLE":
        return [...state, action.payload.data];

      case "MARK_ACTIVE_CYCLE_AS_FINESHED":
        return state.map((cycle) => {
          if (cycle.id === action.payload.data) {
            return {
              ...cycle,
              finishedDate: new Date(),
            };
          }
          return cycle;
        });

      case "INTERRUPT_ACTIVE_CYCLE":
        return state.map((cycle) => {
          if (cycle.id === action.payload.data) {
            return {
              ...cycle,
              interruptedDate: new Date(),
            };
          }
          return cycle;
        });

      default:
        return state;
    }
  }, []);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function startNewCycle(cycle: Cycle) {
    dispatch({ type: "ADD_NEW_CYCLE", payload: { data: cycle } });
    setActiveCycleId(cycle.id);
    setAmountSecondsPassed(0);
  }

  function updateAmountSecondsPassed(secondsPassed: number) {
    setAmountSecondsPassed(secondsPassed);
  }

  function markActiveCycleAsFineshed() {
    if (activeCycleId) {
      dispatch({
        type: "MARK_ACTIVE_CYCLE_AS_FINESHED",
        payload: { data: activeCycleId },
      });
      setActiveCycleId(null);
    }
  }

  function interruptActiveCycle() {
    if (activeCycleId) {
      dispatch({
        type: "INTERRUPT_ACTIVE_CYCLE",
        payload: { data: activeCycleId },
      });
      setActiveCycleId(null);
    }
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
