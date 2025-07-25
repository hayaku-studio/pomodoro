import React from "react";
import { PomodoroState } from "../types";
import { playSound } from "../utils/sound";
import {
  IoCloseOutline,
  IoVolumeHighOutline,
  IoVolumeOffOutline,
} from "react-icons/io5";

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
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors hover:cursor-pointer"
            >
              <IoCloseOutline className="w-6 h-6" />
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
                  <IoVolumeOffOutline className="w-5 h-5 text-gray-400" />

                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
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

                  <IoVolumeHighOutline className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumeSettingsModal;
