import { useEffect } from "react";
import { CountDownContainer, SeparatorContainer } from "./styles";
import { differenceInSeconds } from "date-fns";
import { useCyclesContext } from "../../../contexts/CyclesContext";
import { useFormContext } from "react-hook-form";

export function CountDown() {
  const {
    activeCycle,
    markActiveCycleAsFineshed,
    amountSecondsPassed,
    updateAmountSecondsPassed,
  } = useCyclesContext();
  const newCycleForm = useFormContext();

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = minutesAmount.toString().padStart(2, "0");
  const seconds = secondsAmount.toString().padStart(2, "0");

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference > totalSeconds) {
          markActiveCycleAsFineshed();
          newCycleForm.reset();
        } else {
          updateAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds]);

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <SeparatorContainer>:</SeparatorContainer>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}
