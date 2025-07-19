import React from "react";
import { AnimationButtonProps } from "../types";

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

  const getIconSymbol = (name: string): string => {
    switch (name) {
      case "play":
        return "▶️";
      case "pause":
        return "⏸️";
      case "gobackward":
        return "⏮️";
      case "forward.end":
        return "⏭️";
      case "stop":
        return "⏹️";
      default:
        return "⏸️";
    }
  };

  return (
    <button
      className={`
        flex items-center justify-center w-10 h-10 border-none rounded-full
        bg-gradient-to-br from-indigo-500 to-purple-600 text-white cursor-pointer
        transition-all duration-200 shadow-md relative overflow-hidden
        ${!isDisabled ? "hover:-translate-y-0.5 hover:shadow-lg hover:from-indigo-400 hover:to-purple-500 active:translate-y-0 active:shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-400/40" : ""}
        ${isDisabled ? "bg-gradient-to-br from-gray-400 to-gray-500 cursor-not-allowed opacity-60" : ""}
      `}
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={`Timer ${iconName} button`}
      type="button"
    >
      <span className="text-base leading-none flex items-center justify-center select-none font-system">
        {getIconSymbol(iconName)}
      </span>
    </button>
  );
};

export default AnimationButton;
