import React, { useEffect } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { FlowType, TimeToMagnify } from "../types";
import { getMagnificationFactor } from "../utils/rive";

interface TimerAnimationProps {
  timeSeconds: number;
  flowType: FlowType;
  onTimerComplete?: () => void;
  className?: string;
}

export const TimerAnimation: React.FC<TimerAnimationProps> = ({
  timeSeconds,
  flowType,
  onTimerComplete,
  className = "w-56 h-56 rounded-full",
}) => {
  // Rive setup for pomodoro animation (tomato timer)
  const { rive: pomodoroRive, RiveComponent: PomodoroRiveComponent } = useRive({
    src: "/pomodoro_timer.riv",
    stateMachines: "State Machine",
    artboard: "Pomodoro Timer",
    autoplay: true,
  });

  // Rive setup for coffee animation (break timer)
  const { rive: coffeeRive, RiveComponent: CoffeeRiveComponent } = useRive({
    src: "/pomodoro_timer.riv",
    stateMachines: "State Machine",
    artboard: "Coffee Cup Timer",
    autoplay: true,
  });

  // Get state machine inputs for time control
  const pomodoroTimeInput = useStateMachineInput(
    pomodoroRive,
    "State Machine",
    "timeMinutes",
  );

  const coffeeTimeInput = useStateMachineInput(
    coffeeRive,
    "State Machine",
    "timeMinutes",
  );

  // Get magnification inputs for pomodoro timer
  const pomodoro0Magnified = useStateMachineInput(
    pomodoroRive,
    "State Machine",
    "0 Magnified",
  );
  const pomodoro5Magnified = useStateMachineInput(
    pomodoroRive,
    "State Machine",
    "5 Magnified",
  );
  const pomodoro10Magnified = useStateMachineInput(
    pomodoroRive,
    "State Machine",
    "10 Magnified",
  );
  const pomodoro15Magnified = useStateMachineInput(
    pomodoroRive,
    "State Machine",
    "15 Magnified",
  );
  const pomodoro20Magnified = useStateMachineInput(
    pomodoroRive,
    "State Machine",
    "20 Magnified",
  );

  // Get magnification inputs for coffee timer
  const coffee0Magnified = useStateMachineInput(
    coffeeRive,
    "State Machine",
    "0 Magnified",
  );
  const coffee5Magnified = useStateMachineInput(
    coffeeRive,
    "State Machine",
    "5 Magnified",
  );
  const coffee10Magnified = useStateMachineInput(
    coffeeRive,
    "State Machine",
    "10 Magnified",
  );
  const coffee15Magnified = useStateMachineInput(
    coffeeRive,
    "State Machine",
    "15 Magnified",
  );
  const coffee20Magnified = useStateMachineInput(
    coffeeRive,
    "State Machine",
    "20 Magnified",
  );

  // Get trigger inputs for finish ping animation
  const pomodoroFinishPing = useStateMachineInput(
    pomodoroRive,
    "State Machine",
    "finishPing",
  );

  const coffeeFinishPing = useStateMachineInput(
    coffeeRive,
    "State Machine",
    "finishPing",
  );

  // Update Rive animations when time changes (includes magnification logic)
  useEffect(() => {
    const timeMinutes = timeSeconds / 60;

    if (flowType === FlowType.FOCUS && pomodoroTimeInput) {
      // Set main time input
      pomodoroTimeInput.value = timeMinutes;

      // Set magnification factors for each time marker
      if (pomodoro0Magnified) {
        pomodoro0Magnified.value = getMagnificationFactor(
          TimeToMagnify.TIME_0,
          timeMinutes,
        );
      }
      if (pomodoro5Magnified) {
        pomodoro5Magnified.value = getMagnificationFactor(
          TimeToMagnify.TIME_5,
          timeMinutes,
        );
      }
      if (pomodoro10Magnified) {
        pomodoro10Magnified.value = getMagnificationFactor(
          TimeToMagnify.TIME_10,
          timeMinutes,
        );
      }
      if (pomodoro15Magnified) {
        pomodoro15Magnified.value = getMagnificationFactor(
          TimeToMagnify.TIME_15,
          timeMinutes,
        );
      }
      if (pomodoro20Magnified) {
        pomodoro20Magnified.value = getMagnificationFactor(
          TimeToMagnify.TIME_20,
          timeMinutes,
        );
      }
    } else if (flowType === FlowType.REST && coffeeTimeInput) {
      // Set main time input
      coffeeTimeInput.value = timeMinutes;

      // Set magnification factors for each time marker
      if (coffee0Magnified) {
        coffee0Magnified.value = getMagnificationFactor(
          TimeToMagnify.TIME_0,
          timeMinutes,
        );
      }
      if (coffee5Magnified) {
        coffee5Magnified.value = getMagnificationFactor(
          TimeToMagnify.TIME_5,
          timeMinutes,
        );
      }
      if (coffee10Magnified) {
        coffee10Magnified.value = getMagnificationFactor(
          TimeToMagnify.TIME_10,
          timeMinutes,
        );
      }
      if (coffee15Magnified) {
        coffee15Magnified.value = getMagnificationFactor(
          TimeToMagnify.TIME_15,
          timeMinutes,
        );
      }
      if (coffee20Magnified) {
        coffee20Magnified.value = getMagnificationFactor(
          TimeToMagnify.TIME_20,
          timeMinutes,
        );
      }
    }
  }, [
    timeSeconds,
    flowType,
    pomodoroTimeInput,
    coffeeTimeInput,
    pomodoro0Magnified,
    pomodoro5Magnified,
    pomodoro10Magnified,
    pomodoro15Magnified,
    pomodoro20Magnified,
    coffee0Magnified,
    coffee5Magnified,
    coffee10Magnified,
    coffee15Magnified,
    coffee20Magnified,
  ]);

  // Trigger finish animation when timer completes
  useEffect(() => {
    if (timeSeconds === 0 && onTimerComplete) {
      // Trigger the finish ping animation using state machine inputs
      if (flowType === FlowType.FOCUS && pomodoroFinishPing) {
        pomodoroFinishPing.fire();
      } else if (flowType === FlowType.REST && coffeeFinishPing) {
        coffeeFinishPing.fire();
      }
      onTimerComplete();
    }
  }, [
    timeSeconds,
    flowType,
    pomodoroFinishPing,
    coffeeFinishPing,
    onTimerComplete,
  ]);

  // Render the appropriate animation based on flow type
  return flowType === FlowType.FOCUS ? (
    <PomodoroRiveComponent className={className} />
  ) : (
    <CoffeeRiveComponent className={className} />
  );
};

export default TimerAnimation;
