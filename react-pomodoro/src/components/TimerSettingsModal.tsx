import React, { useState, useEffect } from "react";
import { PomodoroState, FlowType } from "../types";
import Timer from "./Timer";
import { IoCloseOutline } from "react-icons/io5";

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
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartTime, setDragStartTime] = useState(0);

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

  // Mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [
    isDragging,
    dragStartX,
    dragStartTime,
    timeMinutes,
    selectedFlowType,
    onUpdateSettings,
  ]);

  if (!isOpen) return null;

  const handleFlowTypeChange = (flowType: FlowType) => {
    setSelectedFlowType(flowType);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartTime(timeMinutes);
    document.body.style.userSelect = "none"; // Prevent text selection
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = event.clientX - dragStartX;
    const deltaMinutes = Math.floor(deltaX / 6); // Match the macOS implementation (Float(gesture.translation.width)/6)
    const newTime = dragStartTime - deltaMinutes; // Negative like in macOS (timeMinutes -= incrementalTranslation)

    const clampedTime = Math.max(1, Math.min(90, newTime));
    setTimeMinutes(clampedTime);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    setDragStartX(0);
    setDragStartTime(0);
    document.body.style.userSelect = ""; // Restore text selection

    // Save the time setting like in macOS
    if (selectedFlowType === FlowType.FOCUS) {
      onUpdateSettings({ focusTimeIntervalMinutes: timeMinutes });
    } else {
      onUpdateSettings({ restTimeIntervalMinutes: timeMinutes });
    }
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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-gray-800 dark:text-white">
              Timer Settings
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors hover:cursor-pointer"
            >
              <IoCloseOutline className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Flow Type Segmented Control */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => handleFlowTypeChange(FlowType.FOCUS)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedFlowType === FlowType.FOCUS
                      ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:cursor-pointer"
                  }`}
                >
                  Focus
                </button>
                <button
                  onClick={() => handleFlowTypeChange(FlowType.REST)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedFlowType === FlowType.REST
                      ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:cursor-pointer"
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
                className={`relative bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-lg p-4 transition-all duration-200 ${
                  isDragging
                    ? "cursor-grabbing scale-105 shadow-2xl bg-gray-100 dark:bg-gray-600"
                    : "cursor-grab hover:shadow-xl hover:scale-102"
                } select-none`}
                onMouseDown={handleMouseDown}
                style={{ userSelect: "none" }}
              >
                <div className="w-40 h-40 flex items-center justify-center">
                  <Timer
                    timeSeconds={timeMinutes * 60}
                    flowType={selectedFlowType}
                    className="w-full h-full"
                  />
                </div>

                {/* Drag hint overlay */}
                {!isDragging && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <div className="text-white text-xs font-medium bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                      ← Drag to adjust →
                    </div>
                  </div>
                )}

                {/* Active drag indicator */}
                {isDragging && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-indigo-500 rounded-full animate-ping"></div>
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
