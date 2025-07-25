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
      className={`
        flex items-center justify-center w-10 h-10 border-none rounded-full
        text-white cursor-pointer
        transition-all duration-200 shadow-md relative overflow-hidden
        ${!isDisabled ? "hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow-sm focus:outline-none focus:ring-4 focus:ring-red-400/40" : ""}
        ${isDisabled ? "bg-gradient-to-br from-gray-400 to-gray-500 cursor-not-allowed opacity-60" : ""}
      `}
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
      <span className="text-base leading-none flex items-center justify-center select-none font-system">
        <IconComponent className="h-4 w-4" />
      </span>
    </button>
  );
};

export default AnimationButton;
