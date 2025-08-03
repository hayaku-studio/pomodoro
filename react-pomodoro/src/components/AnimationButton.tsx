import React from "react";
import { AnimationButtonProps, Icon } from "../types";
import {
  IoPauseOutline,
  IoPlayOutline,
  IoPlaySkipForwardOutline,
  IoReloadOutline,
  IoStopOutline,
} from "react-icons/io5";

export const AnimationButton: React.FC<AnimationButtonProps> = ({
  action,
  iconName,
  isDisabled,
}) => {
  const handleClick = () => {
    if (!isDisabled) {
      action();
    }
  };

  const getIconSymbol = (name: string): Icon => {
    switch (name) {
      case "play":
        return IoPlayOutline;
      case "pause":
        return IoPauseOutline;
      case "gobackward":
        return IoReloadOutline;
      case "forward.end":
        return IoPlaySkipForwardOutline;
      case "stop":
        return IoStopOutline;
      default:
        return IoPauseOutline;
    }
  };

  const IconComponent = getIconSymbol(iconName);

  return (
    <button
      className={`relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border-none text-white shadow-md transition-all duration-200 ${!isDisabled ? "hover:-translate-y-0.5 hover:shadow-lg focus:ring-4 focus:ring-red-400/40 focus:outline-none active:translate-y-0 active:shadow-sm dark:focus:ring-red-500/40" : ""} ${isDisabled ? "cursor-not-allowed bg-gradient-to-br from-gray-400 to-gray-500 opacity-60 dark:from-gray-600 dark:to-gray-700" : ""} `}
      style={
        !isDisabled
          ? {
              background: "linear-gradient(135deg, #EC5E4A 0%, #D94A36 100%)",
            }
          : undefined
      }
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={`Timer ${iconName} button`}
      type="button"
    >
      <span className="font-system flex items-center justify-center text-base leading-none select-none">
        <IconComponent className="h-4 w-4" />
      </span>
    </button>
  );
};

export default AnimationButton;
