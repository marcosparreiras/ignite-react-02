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

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

type CyclesAction =
  | {
      type: "ADD_NEW_CYCLE";
      payload: { cycle: Cycle };
    }
  | {
      type: "MARK_ACTIVE_CYCLE_AS_FINESHED" | "INTERRUPT_ACTIVE_CYCLE";
    };

export function CyclesContextProvider({ children }: PropsWithChildren) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: CyclesAction) => {
      switch (action.type) {
        case "ADD_NEW_CYCLE":
          return {
            ...state,
            activeCycleId: action.payload.cycle.id,
            cycles: [...state.cycles, action.payload.cycle],
          };

        case "MARK_ACTIVE_CYCLE_AS_FINESHED":
          return {
            ...state,
            activeCycleId: null,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return {
                  ...cycle,
                  finishedDate: new Date(),
                };
              }
              return cycle;
            }),
          };

        case "INTERRUPT_ACTIVE_CYCLE":
          return {
            ...state,
            activeCycleId: null,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return {
                  ...cycle,
                  interruptedDate: new Date(),
                };
              }
              return cycle;
            }),
          };

        default:
          return state;
      }
    },
    { cycles: [], activeCycleId: null }
  );

  const activeCycle = cyclesState.cycles.find(
    (cycle) => cycle.id === cyclesState.activeCycleId
  );

  function startNewCycle(cycle: Cycle) {
    dispatch({ type: "ADD_NEW_CYCLE", payload: { cycle } });
    setAmountSecondsPassed(0);
  }

  function updateAmountSecondsPassed(secondsPassed: number) {
    setAmountSecondsPassed(secondsPassed);
  }

  function markActiveCycleAsFineshed() {
    if (cyclesState.activeCycleId) {
      dispatch({
        type: "MARK_ACTIVE_CYCLE_AS_FINESHED",
      });
    }
  }

  function interruptActiveCycle() {
    if (cyclesState.activeCycleId) {
      dispatch({
        type: "INTERRUPT_ACTIVE_CYCLE",
      });
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
        cycles: cyclesState.cycles,
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
