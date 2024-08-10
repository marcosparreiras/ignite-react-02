export interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface State {
  cycles: Cycle[];
  activeCycleId: string | null;
}

type Action =
  | {
      type: "ADD_NEW_CYCLE";
      payload: { cycle: Cycle };
    }
  | {
      type: "MARK_ACTIVE_CYCLE_AS_FINESHED" | "INTERRUPT_ACTIVE_CYCLE";
    };

export function cyclesReducer(state: State, action: Action): State {
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
}
