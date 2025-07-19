import { useState, useEffect } from "react";
import { FlowType } from "./types";
import AnimationView from "./components/AnimationView";
import { playSound } from "./utils/sound";

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

  // Handle timer completion
  const handleTimerComplete = () => {
    playSound(0.5);
    setIsPlaying(false);
  };

  // Handle direct time setting from drag
  const handleSetTime = (newTime: number) => {
    const clampedTime = Math.max(0, Math.min(5400, newTime)); // Max 90 minutes
    setTimeSeconds(clampedTime);
  };

  // Snap to nearest minute
  const handleSnapToNearestMinute = () => {
    setTimeSeconds((prevTime) => {
      const nearestMinute = Math.round(prevTime / 60) * 60;
      return nearestMinute;
    });
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col font-sans text-gray-800">
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-center">
          <h1 className="text-2xl font-light text-white text-center drop-shadow-sm">
            Pomodoro Timer
          </h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-10 gap-10">
        <AnimationView
          timeSeconds={timeSeconds}
          flowType={flowType}
          isPlaying={isPlaying}
          onToggleTimer={toggleTimer}
          onResetTimer={resetTimer}
          onSkipToNext={switchMode}
          onSetTime={handleSetTime}
          onSnapToNearestMinute={handleSnapToNearestMinute}
          onTimerComplete={handleTimerComplete}
        />
      </main>
    </div>
  );
}

export default App;
