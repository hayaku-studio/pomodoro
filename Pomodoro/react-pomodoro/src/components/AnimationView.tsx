import React, { useRef, useEffect, useState } from 'react';
import { FlowType } from '../types';
import { formatTime } from '../utils/rive';
import AnimationButton from './AnimationButton';
import '../styles/AnimationView.css';

interface AnimationViewProps {
  timeSeconds: number;
  flowType: FlowType;
  isPlaying: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  onSkipToNext: () => void;
  onAdjustTime: (deltaSeconds: number) => void;
  onSnapToNearestMinute: () => void;
}

export const AnimationView: React.FC<AnimationViewProps> = ({
  timeSeconds,
  flowType,
  isPlaying,
  onToggleTimer,
  onResetTimer,
  onSkipToNext,
  onAdjustTime,
  onSnapToNearestMinute
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previousTranslation, setPreviousTranslation] = useState(0);
  const timerDisplayRef = useRef<HTMLDivElement>(null);
  const isTimerGreaterThanZero = timeSeconds > 0;

  // Handle drag gestures for time adjustment
  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setPreviousTranslation(0);
    event.preventDefault();
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging) return;

    const newTranslation = Math.round(event.movementX * 5);
    const incrementalTranslation = newTranslation - previousTranslation;
    setPreviousTranslation(newTranslation);

    onAdjustTime(-incrementalTranslation);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    setPreviousTranslation(0);
    onSnapToNearestMinute();
  };

  // Touch support for mobile
  const handleTouchStart = (event: React.TouchEvent) => {
    setIsDragging(true);
    setPreviousTranslation(0);
    event.preventDefault();
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (!isDragging || event.touches.length === 0) return;

    const touch = event.touches[0];
    const rect = timerDisplayRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const deltaX = touch.clientX - centerX;
    const newTranslation = Math.round(deltaX * 0.5);
    const incrementalTranslation = newTranslation - previousTranslation;
    setPreviousTranslation(newTranslation);

    onAdjustTime(-incrementalTranslation);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    setPreviousTranslation(0);
    onSnapToNearestMinute();
  };

  // Mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, previousTranslation]);

  const getTimerDisplayClass = () => {
    let className = 'timer-display';
    if (flowType === FlowType.FOCUS) {
      className += ' focus-mode';
    } else {
      className += ' rest-mode';
    }
    if (isDragging) {
      className += ' dragging';
    }
    if (timeSeconds <= 30 && timeSeconds > 0) {
      className += ' urgent';
    }
    return className;
  };

  const getAnimationClass = () => {
    let className = 'animation-container';
    if (flowType === FlowType.FOCUS) {
      className += ' focus-animation';
    } else {
      className += ' rest-animation';
    }
    if (isPlaying) {
      className += ' playing';
    }
    return className;
  };

  return (
    <div className="animation-view">
      <div className={getAnimationClass()}>
        <div className="timer-circle-container">
          {/* Animated background circle */}
          <div className="timer-background-circle">
            <svg viewBox="0 0 200 200" className="progress-ring">
              <circle
                cx="100"
                cy="100"
                r="90"
                className="progress-ring-background"
              />
              <circle
                cx="100"
                cy="100"
                r="90"
                className="progress-ring-progress"
                style={{
                  strokeDasharray: 565.48, // 2 * π * 90
                  strokeDashoffset: 565.48 * (1 - (timeSeconds / (flowType === FlowType.FOCUS ? 25 * 60 : 5 * 60)))
                }}
              />
            </svg>
          </div>

          {/* Timer display */}
          <div
            ref={timerDisplayRef}
            className={getTimerDisplayClass()}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="time-text">
              {formatTime(timeSeconds)}
            </div>
            <div className="flow-type-indicator">
              {flowType === FlowType.FOCUS ? (
                <span className="flow-icon">🍅</span>
              ) : (
                <span className="flow-icon">☕</span>
              )}
              <span className="flow-text">{flowType}</span>
            </div>
          </div>

          {/* Drag hint */}
          {!isDragging && (
            <div className="drag-hint">
              <span>← Drag to adjust →</span>
            </div>
          )}
        </div>
      </div>

      {/* Control buttons */}
      <div className="control-buttons">
        <AnimationButton
          action={onToggleTimer}
          iconName={isPlaying ? 'pause' : 'play'}
          isDisabled={!isTimerGreaterThanZero}
        />
        <AnimationButton
          action={onResetTimer}
          iconName="gobackward"
          isDisabled={false}
        />
        <AnimationButton
          action={onSkipToNext}
          iconName="forward.end"
          isDisabled={false}
        />
      </div>
    </div>
  );
};

export default AnimationView;
