import React from "react";
import { PomodoroState } from "../types";

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
  if (!isOpen) return null;

  const handleTimeChange = (key: keyof PomodoroState, value: number) => {
    onUpdateSettings({ [key]: value });
  };

  const handleBooleanChange = (key: keyof PomodoroState, value: boolean) => {
    onUpdateSettings({ [key]: value });
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
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Focus Time */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Focus Time (minutes)
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="1"
                  max="90"
                  value={state.focusTimeIntervalMinutes}
                  onChange={(e) => handleTimeChange('focusTimeIntervalMinutes', parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-center">
                  {state.focusTimeIntervalMinutes}m
                </div>
              </div>
            </div>

            {/* Break Time */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Break Time (minutes)
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={state.restTimeIntervalMinutes}
                  onChange={(e) => handleTimeChange('restTimeIntervalMinutes', parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-center">
                  {state.restTimeIntervalMinutes}m
                </div>
              </div>
            </div>

            {/* Long Break Time */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Long Break Time (minutes)
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={state.longRestTimeIntervalMinutes}
                  onChange={(e) => handleTimeChange('longRestTimeIntervalMinutes', parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-center">
                  {state.longRestTimeIntervalMinutes}m
                </div>
              </div>
            </div>

            {/* Sessions until long break */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Sessions until long break
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={state.requiredCompletedIntervals}
                  onChange={(e) => handleTimeChange('requiredCompletedIntervals', parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-center">
                  {state.requiredCompletedIntervals}
                </div>
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Auto-start Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Auto-start Settings
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    Auto-start break after focus
                  </label>
                  <button
                    onClick={() => handleBooleanChange('automaticallyGoFromFocus', !state.automaticallyGoFromFocus)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      state.automaticallyGoFromFocus ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        state.automaticallyGoFromFocus ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    Auto-start focus after break
                  </label>
                  <button
                    onClick={() => handleBooleanChange('automaticallyGoFromRest', !state.automaticallyGoFromRest)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      state.automaticallyGoFromRest ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        state.automaticallyGoFromRest ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    Auto-start focus after long break
                  </label>
                  <button
                    onClick={() => handleBooleanChange('automaticallyGoFromLongRest', !state.automaticallyGoFromLongRest)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      state.automaticallyGoFromLongRest ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        state.automaticallyGoFromLongRest ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerSettingsModal;
