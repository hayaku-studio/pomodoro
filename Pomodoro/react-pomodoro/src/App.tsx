import { FlowType } from "./types";
import AnimationView from "./components/AnimationView";
import DropdownMenu from "./components/DropdownMenu";
import TimerSettingsModal from "./components/TimerSettingsModal";
import VolumeSettingsModal from "./components/VolumeSettingsModal";
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
          <div className="relative">
            <button
              onClick={() => actions.setShowFabMenu(!state.showFabMenu)}
              className="text-white/80 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
              aria-label="Menu"
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <DropdownMenu
              isOpen={state.showFabMenu}
              onClose={() => actions.setShowFabMenu(false)}
              onTimerClick={() => actions.setShowTimer(true)}
              onSettingsClick={() => actions.setShowSettings(true)}
            />
          </div>
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

      {/* Timer Settings Modal */}
      <TimerSettingsModal
        isOpen={state.showTimer}
        onClose={() => actions.setShowTimer(false)}
        state={state}
        onUpdateSettings={actions.updateSettings}
      />

      {/* Volume Settings Modal */}
      <VolumeSettingsModal
        isOpen={state.showSettings}
        onClose={() => actions.setShowSettings(false)}
        state={state}
        onUpdateSettings={actions.updateSettings}
      />
    </div>
  );
}

export default App;
