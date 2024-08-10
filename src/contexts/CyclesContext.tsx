import {
  createContext,
  useContext,
  useReducer,
  useState,
  type PropsWithChildren,
} from "react";
import { cyclesReducer, type Cycle } from "../reducers/cycles";

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
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });

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
