import React from "react";
import { PomodoroState } from "../types";
import { playSound } from "../utils/sound";

interface SettingsViewProps {
  state: PomodoroState;
  onUpdateSettings: (settings: Partial<PomodoroState>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  state,
  onUpdateSettings,
}) => {
  const handleVolumeChange = (value: number) => {
    onUpdateSettings({ pingVolume: value });
  };

  const handleVolumeChangeComplete = (value: number) => {
    onUpdateSettings({ pingVolume: value });
    playSound(value);
  };

  const handleTimeIntervalChange = (
    key: keyof PomodoroState,
    value: number,
  ) => {
    onUpdateSettings({ [key]: value });
  };

  const handleBooleanSettingChange = (
    key: keyof PomodoroState,
    value: boolean,
  ) => {
    onUpdateSettings({ [key]: value });
  };

  return (
    <div className="w-full max-w-2xl p-0 font-sans">
      <h1 className="text-3xl font-light mb-8 text-gray-800 dark:text-white text-center">
        Settings
      </h1>

      <div className="flex flex-col gap-8">
        {/* Volume Settings */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 ml-2">
            PING VOLUME
          </h3>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-black/5 dark:border-white/10 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-black/8 dark:hover:border-white/15">
            <div className="flex items-center gap-4 w-full">
              <div className="text-lg text-gray-600 dark:text-gray-400 min-w-6 text-center">
                🔈
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={state.pingVolume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                onMouseUp={(e) =>
                  handleVolumeChangeComplete(
                    parseFloat((e.target as HTMLInputElement).value),
                  )
                }
                onTouchEnd={(e) =>
                  handleVolumeChangeComplete(
                    parseFloat((e.target as HTMLInputElement).value),
                  )
                }
                className="flex-1 h-1.5 rounded-sm bg-gray-300 dark:bg-gray-600 outline-none cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-br [&::-webkit-slider-thumb]:from-indigo-500 [&::-webkit-slider-thumb]:to-purple-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:hover:shadow-lg [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-br [&::-moz-range-thumb]:from-indigo-500 [&::-moz-range-thumb]:to-purple-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-200 [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:hover:shadow-lg [&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-sm [&::-moz-range-track]:bg-gray-300 [&::-moz-range-track]:border-none"
                aria-label="Notification volume"
              />
              <div className="text-lg text-gray-600 dark:text-gray-400 min-w-6 text-center">
                🔊
              </div>
            </div>
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 min-w-10 text-right mt-2">
              {Math.round(state.pingVolume * 100)}%
            </div>
          </div>
        </div>

        {/* Timer Duration Settings */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 ml-2">
            TIMER DURATIONS
          </h3>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-black/5 dark:border-white/10 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-black/8 dark:hover:border-white/15">
            <label className="flex items-center gap-3 cursor-pointer m-0">
              <span className="text-base font-medium text-gray-800 dark:text-white flex-1">
                Focus Time (minutes)
              </span>
              <input
                type="number"
                min="1"
                max="90"
                value={state.focusTimeIntervalMinutes}
                onChange={(e) =>
                  handleTimeIntervalChange(
                    "focusTimeIntervalMinutes",
                    parseInt(e.target.value) || 25,
                  )
                }
                className="w-20 p-2 px-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-base font-medium text-center bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 hover:border-gray-400 dark:hover:border-gray-500"
              />
            </label>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-black/5 dark:border-white/10 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-black/8 dark:hover:border-white/15">
            <label className="flex items-center gap-3 cursor-pointer m-0">
              <span className="text-base font-medium text-gray-800 dark:text-white flex-1">
                Break Time (minutes)
              </span>
              <input
                type="number"
                min="1"
                max="30"
                value={state.restTimeIntervalMinutes}
                onChange={(e) =>
                  handleTimeIntervalChange(
                    "restTimeIntervalMinutes",
                    parseInt(e.target.value) || 5,
                  )
                }
                className="w-20 p-2 px-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-base font-medium text-center bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 hover:border-gray-400 dark:hover:border-gray-500"
              />
            </label>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-black/5 dark:border-white/10 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-black/8 dark:hover:border-white/15">
            <label className="flex items-center gap-3 cursor-pointer m-0">
              <span className="text-base font-medium text-gray-800 dark:text-white flex-1">
                Long Break Time (minutes)
              </span>
              <input
                type="number"
                min="5"
                max="60"
                value={state.longRestTimeIntervalMinutes}
                onChange={(e) =>
                  handleTimeIntervalChange(
                    "longRestTimeIntervalMinutes",
                    parseInt(e.target.value) || 15,
                  )
                }
                className="w-20 p-2 px-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-base font-medium text-center bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 hover:border-gray-400 dark:hover:border-gray-500"
              />
            </label>
          </div>
        </div>

        {/* Auto-advance Settings */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 ml-2">
            AUTO-ADVANCE
          </h3>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-black/5 dark:border-white/10 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-black/8 dark:hover:border-white/15">
            <label className="flex items-center gap-3 cursor-pointer m-0">
              <input
                type="checkbox"
                checked={state.automaticallyGoFromFocus}
                onChange={(e) =>
                  handleBooleanSettingChange(
                    "automaticallyGoFromFocus",
                    e.target.checked,
                  )
                }
                className="hidden"
              />
              <span
                className={`w-5 h-5 border-2 rounded relative transition-all duration-200 flex-shrink-0 ${
                  state.automaticallyGoFromFocus
                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-500"
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                {state.automaticallyGoFromFocus && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold">
                    ✓
                  </span>
                )}
              </span>
              <span className="text-base font-medium text-gray-800 dark:text-white flex-1">
                Auto-advance from Focus
              </span>
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-0 leading-6">
              Automatically start break timer when focus session ends
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-black/5 dark:border-white/10 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-black/8 dark:hover:border-white/15">
            <label className="flex items-center gap-3 cursor-pointer m-0">
              <input
                type="checkbox"
                checked={state.automaticallyGoFromRest}
                onChange={(e) =>
                  handleBooleanSettingChange(
                    "automaticallyGoFromRest",
                    e.target.checked,
                  )
                }
                className="hidden"
              />
              <span
                className={`w-5 h-5 border-2 rounded relative transition-all duration-200 flex-shrink-0 ${
                  state.automaticallyGoFromRest
                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-500"
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                {state.automaticallyGoFromRest && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold">
                    ✓
                  </span>
                )}
              </span>
              <span className="text-base font-medium text-gray-800 dark:text-white flex-1">
                Auto-advance from Break
              </span>
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-0 leading-6">
              Automatically start focus timer when break session ends
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-black/5 dark:border-white/10 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-black/8 dark:hover:border-white/15">
            <label className="flex items-center gap-3 cursor-pointer m-0">
              <input
                type="checkbox"
                checked={state.automaticallyGoFromLongRest}
                onChange={(e) =>
                  handleBooleanSettingChange(
                    "automaticallyGoFromLongRest",
                    e.target.checked,
                  )
                }
                className="hidden"
              />
              <span
                className={`w-5 h-5 border-2 rounded relative transition-all duration-200 flex-shrink-0 ${
                  state.automaticallyGoFromLongRest
                    ? "bg-gradient-to-br from-indigo-500 to-purple-600 border-indigo-500"
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                }`}
              >
                {state.automaticallyGoFromLongRest && (
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-bold">
                    ✓
                  </span>
                )}
              </span>
              <span className="text-base font-medium text-gray-800 dark:text-white flex-1">
                Auto-advance from Long Break
              </span>
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-0 leading-6">
              Automatically start focus timer when long break session ends
            </p>
          </div>
        </div>

        {/* Interval Settings */}
      </div>
    </div>
  );
};

export default SettingsView;
