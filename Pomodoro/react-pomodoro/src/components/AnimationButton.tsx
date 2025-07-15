import React from 'react';
import { AnimationButtonProps } from '../types';
import '../styles/AnimationButton.css';

export const AnimationButton: React.FC<AnimationButtonProps> = ({
  action,
  iconName,
  isDisabled
}) => {
  const handleClick = () => {
    if (!isDisabled) {
      action();
    }
  };

  const getIconSymbol = (name: string): string => {
    switch (name) {
      case 'play':
        return '▶';
      case 'pause':
        return '⏸';
      case 'gobackward':
        return '⏮';
      case 'forward.end':
        return '⏭';
      case 'stop':
        return '⏹';
      default:
        return '⏸';
    }
  };

  return (
    <button
      className={`animation-button ${isDisabled ? 'disabled' : ''}`}
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={`Timer ${iconName} button`}
      type="button"
    >
      <span className="button-icon">
        {getIconSymbol(iconName)}
      </span>
    </button>
  );
};

export default AnimationButton;
