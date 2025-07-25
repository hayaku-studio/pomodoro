import React from "react";
import { PomodoroState } from "../types";
import { playSound } from "../utils/sound";

interface VolumeSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: PomodoroState;
  onUpdateSettings: (settings: Partial<PomodoroState>) => void;
}

export const VolumeSettingsModal: React.FC<VolumeSettingsModalProps> = ({
  isOpen,
  onClose,
  state,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const handleVolumeChange = (value: number) => {
    onUpdateSettings({ pingVolume: value });
  };

  const handleVolumeChangeComplete = (value: number) => {
    onUpdateSettings({ pingVolume: value });
    playSound(value);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-gray-800 dark:text-white">
              Settings
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Volume Settings */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                Ping Volume
              </h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M6.343 6.343L4.93 4.93A1 1 0 003.515 6.343l1.414 1.414A8.963 8.963 0 003 12a8.963 8.963 0 001.929 5.243L3.515 18.657A1 1 0 004.93 20.07l1.414-1.414A8.963 8.963 0 0012 21a8.963 8.963 0 005.657-1.929l1.414 1.414a1 1 0 101.414-1.414l-1.414-1.414A8.963 8.963 0 0021 12a8.963 8.963 0 00-1.929-5.243L20.485 5.343A1 1 0 0019.07 3.93l-1.414 1.414z"
                    />
                  </svg>

                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={state.pingVolume}
                      onChange={(e) =>
                        handleVolumeChange(parseFloat(e.target.value))
                      }
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
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
                    />
                  </div>

                  <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-center">
                    {Math.round(state.pingVolume * 100)}%
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => handleVolumeChangeComplete(state.pingVolume)}
                    className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    Test Sound
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 text-white rounded-lg transition-colors duration-200"
              style={{
                background: "linear-gradient(135deg, #EC5E4A 0%, #D94A36 100%)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #D94A36 0%, #C73E2A 100%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #EC5E4A 0%, #D94A36 100%)";
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumeSettingsModal;
