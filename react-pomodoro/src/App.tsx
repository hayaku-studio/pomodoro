import AnimationView from "./components/AnimationView";
import DropdownMenu from "./components/DropdownMenu";
import Logo from "./components/Logo";
import TimerSettingsModal from "./components/TimerSettingsModal";
import VolumeSettingsModal from "./components/VolumeSettingsModal";
import { usePomodoroState } from "./hooks/usePomodoroState";
import { IoMenuOutline, IoLogoGithub } from "react-icons/io5";

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
    <div className="min-h-screen paper-texture dark:bg-gray-900 flex flex-col font-sans text-gray-800 dark:text-gray-200">
      <header className="bg-white/20 dark:bg-gray-800/40 backdrop-blur-sm border-b border-gray-300/30 dark:border-gray-600/30 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 flex items-center justify-between">
          <Logo />
          <h1 className="text-2xl font-light text-gray-700 dark:text-gray-300 text-center drop-shadow-sm flex-1">
            Pomodoro Timer
          </h1>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/hayaku-studio/pomodoro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-300/50 dark:hover:bg-gray-700/50 hover:cursor-pointer"
              aria-label="GitHub Repository"
            >
              <IoLogoGithub className="w-6 h-6" />
            </a>
            <div className="relative">
              <button
                onClick={() => actions.setShowFabMenu(!state.showFabMenu)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-300/50 dark:hover:bg-gray-700/50 hover:cursor-pointer"
                aria-label="Menu"
              >
                <IoMenuOutline className="w-6 h-6" />
              </button>
              <DropdownMenu
                isOpen={state.showFabMenu}
                onClose={() => actions.setShowFabMenu(false)}
                onTimerClick={() => actions.setShowTimer(true)}
                onSettingsClick={() => actions.setShowSettings(true)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-10 gap-10 relative z-10">
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
