import { useForm } from "react-hook-form";
import {
  FormContainer,
  MinutesAmountInputContainer,
  TaskInputContainer,
} from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CyclesContext } from "..";
import { useContext } from "react";

const newCycleValidationSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutesAmount: z.coerce
    .number()
    .min(0, "O ciclo precisa ser no minimo de 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});

type NewCycleFormData = z.infer<typeof newCycleValidationSchema>;

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);

  const form = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const task = form.watch("task");

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInputContainer
        list="task-suggestions"
        placeholder="De um nome para o seu projeto"
        id="task"
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
        id="minutesAmount"
      />
      <span>minutos.</span>
    </FormContainer>
  );
}
