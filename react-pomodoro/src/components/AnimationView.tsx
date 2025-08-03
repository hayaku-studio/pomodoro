import React, { useRef } from "react";
import { FlowType } from "../types";
import AnimationButton from "./AnimationButton";
import Timer from "./Timer";
import { useDragTimeAdjustment } from "../hooks/useDragTimeAdjustment";

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
}) => {
  const timerDisplayRef = useRef<HTMLDivElement>(null);
  const isTimerGreaterThanZero = timeSeconds > 0;

  // Custom hook for drag time adjustment
  const { isDragging, handleMouseDown, handleTouchStart } =
    useDragTimeAdjustment({
      initialTime: timeSeconds,
      onTimeChange: onSetTime,
      onDragEnd: onSnapToNearestMinute,
      sensitivity: 5, // Seconds per pixel
    });

  return (
    <div className="relative flex flex-col items-center justify-center gap-2 p-5 select-none">
      <div
        ref={timerDisplayRef}
        className={isPlaying ? "animate-pulse" : ""}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        {!isDragging && !isPlaying ? (
          <div className="pointer-events-none flex h-9 justify-center rounded-2xl border border-white/10 bg-black/50 px-3 py-2 text-center text-xs whitespace-nowrap text-white/80 opacity-70 backdrop-blur-sm transition-opacity duration-300 hover:opacity-100 dark:border-gray-600/20 dark:bg-gray-800/70 dark:text-gray-300/80">
            <span>← Drag to adjust time →</span>
          </div>
        ) : (
          <div className="h-9" />
        )}
        <Timer
          timeSeconds={timeSeconds}
          flowType={flowType}
          onTimerComplete={onTimerComplete}
          className="h-56 w-56 rounded-full"
        />
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-4">
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
