import { useState, useEffect, useCallback } from "react";

interface UseDragTimeAdjustmentOptions {
  initialTime: number;
  onTimeChange: (newTime: number) => void;
  onDragEnd?: (finalTime: number) => void;
  sensitivity?: number;
  minTime?: number;
  maxTime?: number;
  calculateTimeChange?: (deltaX: number, startTime: number) => number;
}

interface UseDragTimeAdjustmentReturn {
  isDragging: boolean;
  handleMouseDown: (event: React.MouseEvent) => void;
  handleTouchStart: (event: React.TouchEvent) => void;
}

export const useDragTimeAdjustment = ({
  initialTime,
  onTimeChange,
  onDragEnd,
  sensitivity = 5,
  minTime,
  maxTime,
  calculateTimeChange,
}: UseDragTimeAdjustmentOptions): UseDragTimeAdjustmentReturn => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartTime, setDragStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(initialTime);

  const defaultCalculateTimeChange = useCallback(
    (deltaX: number, startTime: number): number => {
      return startTime - deltaX * sensitivity;
    },
    [sensitivity],
  );

  const calculateTime = calculateTimeChange || defaultCalculateTimeChange;

  const applyConstraints = useCallback(
    (time: number): number => {
      let constrainedTime = time;
      if (minTime !== undefined) {
        constrainedTime = Math.max(minTime, constrainedTime);
      }
      if (maxTime !== undefined) {
        constrainedTime = Math.min(maxTime, constrainedTime);
      }
      return constrainedTime;
    },
    [minTime, maxTime],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!isDragging) return;

      const deltaX = event.clientX - dragStartX;
      const newTime = calculateTime(deltaX, dragStartTime);
      const constrainedTime = applyConstraints(newTime);

      setCurrentTime(constrainedTime);
      onTimeChange(constrainedTime);
    },
    [
      isDragging,
      dragStartX,
      dragStartTime,
      calculateTime,
      applyConstraints,
      onTimeChange,
    ],
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    setDragStartX(0);
    setDragStartTime(0);
    document.body.style.userSelect = ""; // Restore text selection

    if (onDragEnd) {
      onDragEnd(currentTime);
    }
  }, [isDragging, currentTime, onDragEnd]);

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!isDragging || event.touches.length === 0) return;

      const deltaX = event.touches[0].clientX - dragStartX;
      const newTime = calculateTime(deltaX, dragStartTime);
      const constrainedTime = applyConstraints(newTime);

      setCurrentTime(constrainedTime);
      onTimeChange(constrainedTime);
      event.preventDefault();
    },
    [
      isDragging,
      dragStartX,
      dragStartTime,
      calculateTime,
      applyConstraints,
      onTimeChange,
    ],
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    setDragStartX(0);
    setDragStartTime(0);
    document.body.style.userSelect = ""; // Restore text selection

    if (onDragEnd) {
      onDragEnd(currentTime);
    }
  }, [isDragging, currentTime, onDragEnd]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      setIsDragging(true);
      setDragStartX(event.clientX);
      setDragStartTime(initialTime);
      setCurrentTime(initialTime);
      document.body.style.userSelect = "none"; // Prevent text selection
    },
    [initialTime],
  );

  const handleTouchStart = useCallback(
    (event: React.TouchEvent) => {
      setIsDragging(true);
      setDragStartX(event.touches[0].clientX);
      setDragStartTime(initialTime);
      setCurrentTime(initialTime);
      document.body.style.userSelect = "none"; // Prevent text selection
      event.preventDefault();
    },
    [initialTime],
  );

  // Mouse and touch event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  return {
    isDragging,
    handleMouseDown,
    handleTouchStart,
  };
};
