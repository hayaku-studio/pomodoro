import React, { useRef, useEffect, useState } from "react";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { FlowType } from "../types";
import { formatTime } from "../utils/rive";
import AnimationButton from "./AnimationButton";
import "../styles/AnimationView.css";

interface AnimationViewProps {
  timeSeconds: number;
  flowType: FlowType;
  isPlaying: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onSkipToNext: () => void;
  onAdjustTime: (deltaSeconds: number) => void;
  onSetTime: (newTime: number) => void;
  onSnapToNearestMinute: () => void;
  onTimerComplete?: () => void;
}

export const AnimationView: React.FC<AnimationViewProps> = ({
  timeSeconds,
  flowType,
  isPlaying,
  onToggleTimer,
  onResetTimer,
  onSkipToNext,
  onAdjustTime,
  onSetTime,
  onSnapToNearestMinute,
  onTimerComplete,
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

  // Update Rive animations when time changes
  useEffect(() => {
    const timeMinutes = timeSeconds / 60;

    if (flowType === FlowType.FOCUS && pomodoroTimeInput) {
      pomodoroTimeInput.value = timeMinutes;
    } else if (flowType === FlowType.REST && coffeeTimeInput) {
      coffeeTimeInput.value = timeMinutes;
    }
  }, [timeSeconds, flowType, pomodoroTimeInput, coffeeTimeInput]);

  // Trigger finish animation when timer completes
  useEffect(() => {
    if (timeSeconds === 0 && onTimerComplete) {
      // Trigger the finish ping animation
      try {
        if (flowType === FlowType.FOCUS && pomodoroRive) {
          pomodoroRive.triggerInput?.("finishPing");
        } else if (flowType === FlowType.REST && coffeeRive) {
          coffeeRive.triggerInput?.("finishPing");
        }
      } catch (error) {
        // Finish ping not available, continue without it
      }
      onTimerComplete();
    }
  }, [timeSeconds, flowType, pomodoroRive, coffeeRive, onTimerComplete]);

  // Handle drag gestures for time adjustment
  const handleMouseDown = (event: React.MouseEvent) => {
    if (isPlaying) return; // Don't allow dragging while timer is running

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
    const newTime = dragStartTime + deltaX * sensitivity;

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
    if (isPlaying) return;

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
    const newTime = dragStartTime + deltaX * sensitivity;

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

  const getTimerDisplayClass = () => {
    let className = "timer-display";
    if (flowType === FlowType.FOCUS) {
      className += " focus-mode";
    } else {
      className += " rest-mode";
    }
    if (isDragging) {
      className += " dragging";
    }
    if (timeSeconds <= 30 && timeSeconds > 0) {
      className += " urgent";
    }
    if (!isPlaying && isTimerGreaterThanZero) {
      className += " interactive";
    }
    return className;
  };

  const getAnimationClass = () => {
    let className = "animation-container";
    if (flowType === FlowType.FOCUS) {
      className += " focus-animation";
    } else {
      className += " rest-animation";
    }
    if (isPlaying) {
      className += " playing";
    }
    return className;
  };

  return (
    <div className="animation-view">
      <div className={getAnimationClass()}>
        <div className="timer-circle-container">
          {/* Rive Animation */}
          <div className="rive-animation">
            {flowType === FlowType.FOCUS ? (
              <PomodoroRiveComponent className="rive-canvas" />
            ) : (
              <CoffeeRiveComponent className="rive-canvas" />
            )}
          </div>

          {/* Interactive overlay for dragging */}
          <div
            ref={timerDisplayRef}
            className={getTimerDisplayClass()}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{
              cursor: isDragging
                ? "grabbing"
                : !isPlaying && isTimerGreaterThanZero
                  ? "grab"
                  : "default",
            }}
          >
            <div className="time-text">{formatTime(timeSeconds)}</div>
            <div className="flow-type-indicator">
              {flowType === FlowType.FOCUS ? (
                <span className="flow-icon">🍅</span>
              ) : (
                <span className="flow-icon">☕</span>
              )}
              <span className="flow-text">{flowType}</span>
            </div>
          </div>

          {/* Drag hint */}
          {!isDragging && !isPlaying && isTimerGreaterThanZero && (
            <div className="drag-hint">
              <span>← Drag to adjust time →</span>
            </div>
          )}
        </div>
      </div>

      {/* Control buttons */}
      <div className="control-buttons">
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
