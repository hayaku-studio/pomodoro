import React, { useEffect } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { FlowType, TimeToMagnify } from "../types";
import { getMagnificationFactor } from "../utils/rive";

interface RiveTimerAnimationProps {
  timeMinutes: number;
  flowType: FlowType;
  onMouseDown?: (e: React.MouseEvent) => void;
  isDragging?: boolean;
  className?: string;
}

export const RiveTimerAnimation: React.FC<RiveTimerAnimationProps> = ({
  timeMinutes,
  flowType,
  onMouseDown,
  isDragging = false,
  className = "",
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

  // Update Rive animations when time changes (includes magnification logic)
  useEffect(() => {
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
    timeMinutes,
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

  const getContainerClasses = () => {
    const baseClasses = "relative w-full h-full flex items-center justify-center";
    const draggingClasses = isDragging ? "scale-105" : "";
    return `${baseClasses} ${draggingClasses} ${className}`;
  };

  return (
    <div
      className={getContainerClasses()}
      onMouseDown={onMouseDown}
      style={{ userSelect: "none" }}
    >
      {/* Rive Animation */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {flowType === FlowType.FOCUS ? (
          <PomodoroRiveComponent className="w-full h-full" />
        ) : (
          <CoffeeRiveComponent className="w-full h-full" />
        )}
      </div>

      {/* Time overlay (optional, can be hidden by passing empty className) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white drop-shadow-lg">
          <div className="text-lg font-semibold">{timeMinutes}m</div>
        </div>
      </div>
    </div>
  );
};

export default RiveTimerAnimation;
