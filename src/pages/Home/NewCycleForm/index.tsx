import {
  FormContainer,
  MinutesAmountInputContainer,
  TaskInputContainer,
} from "./styles";
import { useFormContext } from "react-hook-form";
import { useCyclesContext } from "../../../contexts/CyclesContext";

export function NewCycleForm() {
  const { activeCycle } = useCyclesContext();

  const newCycleForm = useFormContext();

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInputContainer
        list="task-suggestions"
        placeholder="De um nome para o seu projeto"
        id="task"
        disabled={!!activeCycle}
        {...newCycleForm.register("task")}
      />
      <datalist id="task-suggestions">
        <option value="projeto 01" />
        <option value="projeto 02" />
        <option value="projeto 03" />
        <option value="projeto 04" />
      </datalist>
      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInputContainer
        {...newCycleForm.register("minutesAmount", { valueAsNumber: true })}
        placeholder="00"
        type="number"
        max={60}
        min={0}
        step={1}
        disabled={!!activeCycle}
        id="minutesAmount"
      />
      <span>minutos.</span>
    </FormContainer>
  );
}
