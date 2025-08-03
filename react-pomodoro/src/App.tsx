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
    <div className="paper-texture flex min-h-screen flex-col font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-200">
      <header className="sticky top-0 z-50 border-b border-gray-300/30 bg-white/20 py-4 backdrop-blur-sm dark:border-gray-600/30 dark:bg-gray-800/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
          <Logo />
          <h1 className="flex-1 text-center text-2xl font-light text-gray-700 drop-shadow-sm dark:text-gray-300">
            Pomodoro Timer
          </h1>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/hayaku-studio/pomodoro"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 rounded-lg p-2 text-gray-600 transition-colors duration-200 hover:cursor-pointer hover:bg-gray-300/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-gray-200"
              aria-label="GitHub Repository"
            >
              <span className="hidden md:block">Download for macOS</span>
              <IoLogoGithub className="h-6 w-6" />
            </a>
            <div className="relative">
              <button
                onClick={() => actions.setShowFabMenu(!state.showFabMenu)}
                className="rounded-lg p-2 text-gray-600 transition-colors duration-200 hover:cursor-pointer hover:bg-gray-300/50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-gray-200"
                aria-label="Menu"
              >
                <IoMenuOutline className="h-6 w-6" />
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

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center gap-10 p-10">
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
