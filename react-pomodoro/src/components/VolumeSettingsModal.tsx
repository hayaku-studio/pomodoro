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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-xl bg-white shadow-2xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-light text-gray-800 dark:text-white">
              Settings
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 transition-colors hover:cursor-pointer hover:text-gray-600 dark:hover:text-gray-200"
            >
              <IoCloseOutline className="h-6 w-6" />
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
                  <IoVolumeOffOutline className="h-5 w-5 text-gray-400" />

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
                      className="slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                    />
                  </div>

                  <IoVolumeHighOutline className="h-5 w-5 text-gray-400" />
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
