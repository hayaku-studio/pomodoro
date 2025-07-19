import React from "react";
import { FlowType, TimerIconProps } from "../types";
import { formatTimeForIcon } from "../utils/rive";

interface PomodoroIconProps extends TimerIconProps {
  className?: string;
}

export const PomodoroIcon: React.FC<PomodoroIconProps> = ({
  timeSeconds,
  flowType,
  className = "",
}) => {
  const isTimeLessThan30s = timeSeconds <= 30 && timeSeconds > 0;
  const formattedTime = formatTimeForIcon(timeSeconds);
  const isFocusFlowType = flowType === FlowType.FOCUS;

  return (
    <div className={`flex items-center justify-center font-sans ${className}`}>
      <div
        className={`relative flex items-center justify-center w-9 h-5 p-0.5 ${isFocusFlowType ? "gap-0.5" : "gap-0"}`}
      >
        <div className="relative flex items-center justify-center z-[1]">
          {isFocusFlowType ? (
            <div className="text-xs leading-none drop-shadow-sm">🍅</div>
          ) : (
            <div className="text-xs leading-none transform translate-x-px translate-y-px drop-shadow-sm">
              ☕
            </div>
          )}
        </div>
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-y-px text-[10px] font-semibold text-white z-[2] leading-none tracking-tighter ${isTimeLessThan30s ? "text-red-400 animate-pulse" : ""}`}
          style={{
            textShadow:
              "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 2px rgba(0,0,0,0.8)",
          }}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default PomodoroIcon;
