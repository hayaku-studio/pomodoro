import React, { useState, useEffect } from "react";
import { FlowType } from "./types";
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
        <div className="timer-container">
          <div className="timer-display">
            <div className="time-text">{formatTime(timeSeconds)}</div>
            <div className="flow-type">{flowType}</div>
          </div>

          <div className="timer-controls">
            <button onClick={toggleTimer} className="control-button">
              {isPlaying ? "⏸️ Pause" : "▶️ Play"}
            </button>
            <button onClick={resetTimer} className="control-button">
              🔄 Reset
            </button>
            <button onClick={switchMode} className="control-button">
              {flowType === FlowType.FOCUS ? "☕ Break" : "🍅 Focus"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
