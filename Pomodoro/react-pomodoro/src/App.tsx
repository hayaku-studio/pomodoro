import { FlowType } from "./types";
import AnimationView from "./components/AnimationView";
import SettingsView from "./components/SettingsView";
import { usePomodoroState } from "./hooks/usePomodoroState";

function App() {
  const { state, actions } = usePomodoroState();

  // Handle direct time setting from drag
  const handleSetTime = (newTime: number) => {
    const clampedTime = Math.max(0, Math.min(5400, newTime)); // Max 90 minutes
    actions.setTimeSeconds(clampedTime);
  };

  // Snap to nearest minute
  const handleSnapToNearestMinute = () => {
    actions.snapToNearestMinute();
  };

  // Handle timer completion
  const handleTimerComplete = () => {
    // Timer completion logic is handled in the usePomodoroState hook
    // This callback is for any additional UI effects if needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col font-sans text-gray-800">
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          <h1 className="text-2xl font-light text-white text-center drop-shadow-sm flex-1">
            Pomodoro Timer
          </h1>
          <button
            onClick={() => actions.setShowSettings(!state.showSettings)}
            className="text-white/80 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
            aria-label="Settings"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-10 gap-10">
        <AnimationView
          timeSeconds={state.timeSeconds}
          flowType={state.flowType}
          isPlaying={state.isPlaying}
          onToggleTimer={actions.toggleTimer}
          onResetTimer={actions.resetTimer}
          onSkipToNext={actions.skipToNext}
          onSetTime={handleSetTime}
          onSnapToNearestMinute={handleSnapToNearestMinute}
          onTimerComplete={handleTimerComplete}
        />

        {/* Progress indicator */}
        <div className="flex items-center gap-2">
          {Array.from({ length: state.requiredCompletedIntervals }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i < state.currentCompletedIntervals
                  ? "bg-white shadow-lg"
                  : "bg-white/30 border border-white/50"
              }`}
            />
          ))}
        </div>

        {/* Current mode indicator */}
        <div className="text-white/80 text-sm font-medium uppercase tracking-wider">
          {state.flowType === FlowType.FOCUS ? "Focus Session" : "Break Time"}
        </div>
      </main>

      {/* Settings Modal */}
      {state.showSettings && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => actions.setShowSettings(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <SettingsView
              state={state}
              onUpdateSettings={actions.updateSettings}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
