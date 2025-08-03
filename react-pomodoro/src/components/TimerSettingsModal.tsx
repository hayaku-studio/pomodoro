import React, { useState } from "react";
import { PomodoroState, FlowType } from "../types";
import Timer from "./Timer";
import { IoCloseOutline } from "react-icons/io5";
import { useDragTimeAdjustment } from "../hooks/useDragTimeAdjustment";

interface TimerSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: PomodoroState;
  onUpdateSettings: (settings: Partial<PomodoroState>) => void;
}

export const TimerSettingsModal: React.FC<TimerSettingsModalProps> = ({
  isOpen,
  onClose,
  state,
  onUpdateSettings,
}) => {
  const [selectedFlowType, setSelectedFlowType] = useState<FlowType>(
    FlowType.FOCUS,
  );
  const [timeMinutes, setTimeMinutes] = useState(() => {
    return selectedFlowType === FlowType.FOCUS
      ? state.focusTimeIntervalMinutes
      : state.restTimeIntervalMinutes;
  });

  // Custom hook for drag time adjustment
  const { isDragging, handleMouseDown, handleTouchStart } =
    useDragTimeAdjustment({
      initialTime: timeMinutes,
      onTimeChange: setTimeMinutes,
      onDragEnd: (finalTime) => {
        // Save the time setting like in macOS
        if (selectedFlowType === FlowType.FOCUS) {
          onUpdateSettings({ focusTimeIntervalMinutes: finalTime });
        } else {
          onUpdateSettings({ restTimeIntervalMinutes: finalTime });
        }
      },
      calculateTimeChange: (deltaX, startTime) => {
        const deltaMinutes = Math.floor(deltaX / 6); // Match the macOS implementation (Float(gesture.translation.width)/6)
        return startTime - deltaMinutes; // Negative like in macOS (timeMinutes -= incrementalTranslation)
      },
      minTime: 1,
      maxTime: 90,
    });

  // Update time minutes when flow type changes
  React.useEffect(() => {
    const newTime =
      selectedFlowType === FlowType.FOCUS
        ? state.focusTimeIntervalMinutes
        : state.restTimeIntervalMinutes;
    setTimeMinutes(newTime);
  }, [
    selectedFlowType,
    state.focusTimeIntervalMinutes,
    state.restTimeIntervalMinutes,
  ]);

  if (!isOpen) return null;

  const handleFlowTypeChange = (flowType: FlowType) => {
    setSelectedFlowType(flowType);
  };

  const handleBooleanChange = (key: keyof PomodoroState, value: boolean) => {
    onUpdateSettings({ [key]: value });
  };

  const getAutoStartToggleText = () => {
    return selectedFlowType === FlowType.FOCUS
      ? "Start Break Automatically"
      : "Start Focus Automatically";
  };

  const getAutoStartToggleValue = () => {
    return selectedFlowType === FlowType.FOCUS
      ? state.automaticallyGoFromFocus
      : state.automaticallyGoFromRest;
  };

  const getAutoStartToggleKey = (): keyof PomodoroState => {
    return selectedFlowType === FlowType.FOCUS
      ? "automaticallyGoFromFocus"
      : "automaticallyGoFromRest";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[80vh] w-full max-w-md overflow-y-auto rounded-xl bg-white shadow-2xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-light text-gray-800 dark:text-white">
              Timer Settings
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 transition-colors hover:cursor-pointer hover:text-gray-600 dark:hover:text-gray-200"
            >
              <IoCloseOutline className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Flow Type Segmented Control */}
            <div className="rounded-lg bg-gray-100 p-1 dark:bg-gray-700">
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => handleFlowTypeChange(FlowType.FOCUS)}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    selectedFlowType === FlowType.FOCUS
                      ? "bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white"
                      : "text-gray-500 hover:cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  Focus
                </button>
                <button
                  onClick={() => handleFlowTypeChange(FlowType.REST)}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    selectedFlowType === FlowType.REST
                      ? "bg-white text-gray-900 shadow-sm dark:bg-gray-600 dark:text-white"
                      : "text-gray-500 hover:cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  }`}
                >
                  Break
                </button>
              </div>
            </div>

            {/* Timer Instructions */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Set Timer Interval
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Drag the timer to set.
              </p>
            </div>

            {/* Draggable Animation */}
            <div className="flex justify-center">
              <div
                className={`relative rounded-2xl bg-gray-50 p-4 shadow-lg transition-all duration-200 dark:bg-gray-700 ${
                  isDragging
                    ? "scale-105 cursor-grabbing bg-gray-100 shadow-2xl dark:bg-gray-600"
                    : "cursor-grab hover:scale-102 hover:shadow-xl"
                } select-none`}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                style={{ userSelect: "none" }}
              >
                <div className="flex h-40 w-40 items-center justify-center">
                  <Timer
                    timeSeconds={timeMinutes * 60}
                    flowType={selectedFlowType}
                    className="h-full w-full"
                  />
                </div>

                {/* Drag hint overlay */}
                {!isDragging && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/10 opacity-0 transition-opacity duration-200 hover:opacity-100">
                    <div className="rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      ← Drag to adjust →
                    </div>
                  </div>
                )}

                {/* Active drag indicator */}
                {isDragging && (
                  <div className="absolute -top-2 -right-2 h-4 w-4 animate-ping rounded-full bg-indigo-500"></div>
                )}
              </div>
            </div>

            {/* Auto-start Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                {getAutoStartToggleText()}
              </label>
              <button
                onClick={() =>
                  handleBooleanChange(
                    getAutoStartToggleKey(),
                    !getAutoStartToggleValue(),
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors hover:cursor-pointer ${
                  getAutoStartToggleValue()
                    ? "bg-green-500"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    getAutoStartToggleValue()
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerSettingsModal;
