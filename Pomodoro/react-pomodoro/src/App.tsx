import React, { useState, useEffect } from "react";
import { FlowType } from "./types";
import AnimationView from "./components/AnimationView";
import { playSound } from "./utils/sound";
import "./styles/App.css";

function App() {
  const [timeSeconds, setTimeSeconds] = useState(25 * 60); // 25 minutes
  const [flowType, setFlowType] = useState<FlowType>(FlowType.FOCUS);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simple timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying && timeSeconds > 0) {
      interval = setInterval(() => {
        setTimeSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, timeSeconds]);

  // Format time display
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Handle timer completion
  const handleTimerComplete = () => {
    playSound(0.5);
    setIsPlaying(false);
  };

  // Handle time adjustment from drag
  const handleAdjustTime = (deltaSeconds: number) => {
    const newTime = Math.max(0, Math.min(5400, timeSeconds + deltaSeconds)); // Max 90 minutes
    setTimeSeconds(newTime);
  };

  // Snap to nearest minute
  const handleSnapToNearestMinute = () => {
    const nearestMinute = Math.round(timeSeconds / 60) * 60;
    setTimeSeconds(nearestMinute);
  };

  const toggleTimer = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    setIsPlaying(false);
    setTimeSeconds(flowType === FlowType.FOCUS ? 25 * 60 : 5 * 60);
  };

  const switchMode = () => {
    const newMode =
      flowType === FlowType.FOCUS ? FlowType.REST : FlowType.FOCUS;
    setFlowType(newMode);
    setIsPlaying(false);
    setTimeSeconds(newMode === FlowType.FOCUS ? 25 * 60 : 5 * 60);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Pomodoro Timer</h1>
      </header>

      <main className="app-main">
        <AnimationView
          timeSeconds={timeSeconds}
          flowType={flowType}
          isPlaying={isPlaying}
          onToggleTimer={toggleTimer}
          onResetTimer={resetTimer}
          onSkipToNext={switchMode}
          onAdjustTime={handleAdjustTime}
          onSnapToNearestMinute={handleSnapToNearestMinute}
          onTimerComplete={handleTimerComplete}
        />
      </main>
    </div>
  );
}

export default App;
