import React from 'react';
import { FlowType, TimerIconProps } from '../types';
import { formatTimeForIcon } from '../utils/rive';
import '../styles/PomodoroIcon.css';

interface PomodoroIconProps extends TimerIconProps {
  className?: string;
}

export const PomodoroIcon: React.FC<PomodoroIconProps> = ({
  timeSeconds,
  flowType,
  className = ''
}) => {
  const isTimeLessThan30s = timeSeconds <= 30 && timeSeconds > 0;
  const formattedTime = formatTimeForIcon(timeSeconds);
  const isFocusFlowType = flowType === FlowType.FOCUS;

  return (
    <div className={`pomodoro-icon ${className}`}>
      <div className={`icon-container ${isFocusFlowType ? 'focus' : 'rest'}`}>
        <div className="icon-background">
          {isFocusFlowType ? (
            <div className="tomato-icon">🍅</div>
          ) : (
            <div className="coffee-icon">☕</div>
          )}
        </div>
        <div className={`time-display ${isTimeLessThan30s ? 'urgent' : ''}`}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default PomodoroIcon;
