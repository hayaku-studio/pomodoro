import { TimeToMagnify } from '../types';

/**
 * Utility functions for Rive animation time calculations
 * These functions replicate the Swift implementation for magnification factors
 */

/**
 * Get the magnification factor for a specific time point
 * This controls how prominent each time marker appears in the Rive animation
 */
export const getMagnificationFactor = (timeToMagnify: TimeToMagnify, timeMinutes: number): number => {
  const loopedMinutes = timeMinutes % 25;
  const magnificationFactor = 15.0;

  // Get the numeric value for the time to magnify
  const timeValue = getTimeToMagnifyValue(timeToMagnify);

  switch (timeToMagnify) {
    case TimeToMagnify.TIME_0:
    case TimeToMagnify.TIME_5:
      const absoluteDifference = loopedMinutes > 12.5 + timeValue
        ? 25 - Math.abs(timeValue - loopedMinutes)
        : Math.abs(timeValue - loopedMinutes);
      return 100 - absoluteDifference * magnificationFactor;

    case TimeToMagnify.TIME_10:
    case TimeToMagnify.TIME_15:
      return 100 - Math.abs(timeValue - loopedMinutes) * magnificationFactor;

    case TimeToMagnify.TIME_20:
      const absoluteDiff = loopedMinutes < 7.5
        ? 25 - Math.abs(timeValue - loopedMinutes)
        : Math.abs(timeValue - loopedMinutes);
      return 100 - absoluteDiff * magnificationFactor;

    default:
      return 100;
  }
};

/**
 * Get the numeric value for a TimeToMagnify enum
 */
export const getTimeToMagnifyValue = (timeToMagnify: TimeToMagnify): number => {
  switch (timeToMagnify) {
    case TimeToMagnify.TIME_0:
      return 0;
    case TimeToMagnify.TIME_5:
      return 5;
    case TimeToMagnify.TIME_10:
      return 10;
    case TimeToMagnify.TIME_15:
      return 15;
    case TimeToMagnify.TIME_20:
      return 20;
    default:
      return 0;
  }
};

/**
 * Update time inputs for Rive animation
 * This function would be used with the Rive runtime to update animation state
 */
export const updateTimeInput = (riveRef: any, minutes: number): void => {
  if (!riveRef?.current) return;

  try {
    // Set the main time input
    riveRef.current.setInput('timeMinutes', minutes);

    // Set magnification factors for each time marker
    Object.values(TimeToMagnify).forEach(timeToMagnify => {
      const magnificationFactor = getMagnificationFactor(timeToMagnify, minutes);
      riveRef.current.setInput(timeToMagnify, magnificationFactor);
    });
  } catch (error) {
    console.warn('Failed to update Rive time input:', error);
  }
};

/**
 * Trigger a finish ping animation in Rive
 */
export const triggerFinishPing = (riveRef: any): void => {
  if (!riveRef?.current) return;

  try {
    riveRef.current.triggerInput('finishPing');
  } catch (error) {
    console.warn('Failed to trigger finish ping:', error);
  }
};

/**
 * Format time in minutes and seconds for display
 */
export const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Format time for icon display (matches Swift implementation)
 */
export const formatTimeForIcon = (totalSeconds: number): string => {
  const isTimeLessThan30s = totalSeconds <= 30 && totalSeconds > 0;
  const time = isTimeLessThan30s ? totalSeconds : Math.round(totalSeconds / 60);
  return time.toString().padStart(2, '0');
};

/**
 * Calculate progress percentage for interval tracking
 */
export const calculateProgressPercentage = (
  currentIntervals: number,
  requiredIntervals: number
): number => {
  if (requiredIntervals === 0) return 0;
  return Math.min(100, (currentIntervals * 100) / requiredIntervals);
};

/**
 * Animate progress percentage change with smooth transitions
 */
export const animateProgressChange = (
  oldPercentage: number,
  newPercentage: number,
  callback: (percentage: number) => void,
  duration: number = 1000
): (() => void) => {
  const startTime = Date.now();
  const difference = newPercentage - oldPercentage;

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Use easeOutCubic for smooth animation
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentPercentage = oldPercentage + (difference * easedProgress);

    callback(currentPercentage);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  const animationId = requestAnimationFrame(animate);

  // Return cleanup function
  return () => cancelAnimationFrame(animationId);
};
