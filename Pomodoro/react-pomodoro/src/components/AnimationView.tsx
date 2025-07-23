import React, { useRef, useEffect, useState } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { FlowType, TimeToMagnify } from "../types";
import { formatTime, getMagnificationFactor } from "../utils/rive";
import AnimationButton from "./AnimationButton";

interface AnimationViewProps {
  timeSeconds: number;
  flowType: FlowType;
  isPlaying: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onSkipToNext: () => void;

  onSetTime: (newTime: number) => void;
  onSnapToNearestMinute: () => void;
  onTimerComplete?: () => void;
  hideOverlay?: boolean; // Option to completely hide the timer overlay for testing
}

export const AnimationView: React.FC<AnimationViewProps> = ({
  timeSeconds,
  flowType,
  isPlaying,
  onToggleTimer,
  onResetTimer,
  onSkipToNext,

  onSetTime,
  onSnapToNearestMinute,
  onTimerComplete,
  hideOverlay = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartTime, setDragStartTime] = useState(0);

  const timerDisplayRef = useRef<HTMLDivElement>(null);
  const isTimerGreaterThanZero = timeSeconds > 0;

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

  // Handle drag gestures for time adjustment
  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(event.clientX);
    setDragStartTime(timeSeconds);
    document.body.style.userSelect = "none"; // Prevent text selection
    event.preventDefault();
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = event.clientX - dragStartX;
    const sensitivity = 5; // Seconds per pixel
    const newTime = dragStartTime - deltaX * sensitivity;

    // Set the time directly
    onSetTime(newTime);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    setDragStartX(0);
    setDragStartTime(0);
    document.body.style.userSelect = ""; // Restore text selection
    onSnapToNearestMinute();
  };

  // Touch support for mobile
  const handleTouchStart = (event: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(event.touches[0].clientX);
    setDragStartTime(timeSeconds);
    document.body.style.userSelect = "none"; // Prevent text selection
    event.preventDefault();
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (!isDragging || event.touches.length === 0) return;

    const deltaX = event.touches[0].clientX - dragStartX;
    const sensitivity = 5; // Seconds per pixel
    const newTime = dragStartTime - deltaX * sensitivity;

    // Set the time directly
    onSetTime(newTime);
    event.preventDefault();
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    setDragStartX(0);
    setDragStartTime(0);
    document.body.style.userSelect = ""; // Restore text selection
    onSnapToNearestMinute();
  };

  // Mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isDragging, dragStartX, dragStartTime]);

  const getTimerDisplayClasses = () => {
    const baseClasses =
      "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full flex flex-col items-center justify-center transition-all duration-200 z-10 bg-white/10 backdrop-blur-sm border-2 border-white/20";
    const interactiveClasses = isTimerGreaterThanZero
      ? "cursor-grab border-white/30 hover:scale-105 hover:bg-white/15 hover:shadow-lg hover:border-white/40"
      : "";
    const draggingClasses = isDragging
      ? "cursor-grabbing scale-105 shadow-xl bg-white/10"
      : "";
    const urgentClasses =
      timeSeconds <= 30 && timeSeconds > 0 ? "animate-pulse shadow-lg" : "";
    const focusClasses =
      flowType === FlowType.FOCUS ? "border-red-400/20" : "border-amber-700/20";

    return `${baseClasses} ${interactiveClasses} ${draggingClasses} ${urgentClasses} ${focusClasses}`;
  };

  const getAnimationClasses = () => {
    const baseClasses = "relative w-56 h-56 flex items-center justify-center";
    const pulseClasses = isPlaying ? "animate-pulse" : "";
    const focusClasses =
      flowType === FlowType.FOCUS
        ? "drop-shadow-[0_4px_12px_rgba(255,99,71,0.3)]"
        : "drop-shadow-[0_4px_12px_rgba(101,67,33,0.3)]";

    return `${baseClasses} ${pulseClasses} ${focusClasses}`;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-5 select-none">
      <div className={getAnimationClasses()}>
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Rive Animation */}
          <div className="absolute top-0 left-0 w-full h-full z-[1] pointer-events-none">
            {flowType === FlowType.FOCUS ? (
              <PomodoroRiveComponent className="w-full h-full rounded-full" />
            ) : (
              <CoffeeRiveComponent className="w-full h-full rounded-full" />
            )}
          </div>

          {/* Interactive overlay for dragging */}
          {!hideOverlay && (
            <div
              ref={timerDisplayRef}
              className={getTimerDisplayClasses()}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              style={{
                cursor: isDragging ? "grabbing" : "grab",
              }}
            >
              <div className="text-4xl font-light text-white drop-shadow-lg mb-1 leading-none tracking-tight">
                {formatTime(timeSeconds)}
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-white/90 drop-shadow-sm uppercase tracking-wider">
                {flowType === FlowType.FOCUS ? (
                  <span className="text-sm leading-none">🍅</span>
                ) : (
                  <span className="text-sm leading-none">☕</span>
                )}
                <span className="text-[11px]">{flowType}</span>
              </div>
            </div>
          )}

          {!isDragging && isTimerGreaterThanZero && (
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-xs text-white/80 text-center opacity-70 transition-opacity duration-300 hover:opacity-100 pointer-events-none whitespace-nowrap bg-black/50 px-3 py-2 rounded-2xl backdrop-blur-sm border border-white/10">
              <span>← Drag to adjust time →</span>
            </div>
          )}
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-4 mt-2">
        <AnimationButton
          action={onToggleTimer}
          iconName={isPlaying ? "pause" : "play"}
          isDisabled={!isTimerGreaterThanZero}
        />
        <AnimationButton
          action={onResetTimer}
          iconName="gobackward"
          isDisabled={false}
        />
        <AnimationButton
          action={onSkipToNext}
          iconName="forward.end"
          isDisabled={false}
        />
      </div>
    </div>
  );
};

export default AnimationView;
