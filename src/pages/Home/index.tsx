import { useForm } from "react-hook-form";
import { Play } from "phosphor-react";
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInputContainer,
  SeparatorContainer,
  StartCountDownButtonContainer,
  TaskInputContainer,
} from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const newCycleValidationSchema = z.object({
  task: z.string().min(1, "Informe a tarefa"),
  minutesAmount: z.coerce
    .number()
    .min(0, "O ciclo precisa ser no minimo de 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});

type NewCycleFormData = z.infer<typeof newCycleValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

  const form = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  function handleNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
    };
    setCycles((prev) => [...prev, newCycle]);
    setActiveCycleId(newCycle.id);

    form.reset();
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = minutesAmount.toString().padStart(2, "0");
  const seconds = secondsAmount.toString().padStart(2, "0");

  const task = form.watch("task");

  return (
    <HomeContainer>
      <form onSubmit={form.handleSubmit(handleNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInputContainer
            list="task-suggestions"
            placeholder="De um nome para o seu projeto"
            id="task"
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
            id="minutesAmount"
          />
          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <SeparatorContainer>:</SeparatorContainer>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        <StartCountDownButtonContainer disabled={!task} type="submit">
          <Play size={24} /> Começar
        </StartCountDownButtonContainer>
      </form>
    </HomeContainer>
  );
}
