import React from 'react';
import { usePomodoroState } from './hooks/usePomodoroState';
import AnimationView from './components/AnimationView';
import SettingsView from './components/SettingsView';
import Modal from './components/Modal';
import PomodoroIcon from './components/PomodoroIcon';
import './styles/App.css';

function App() {
  const { state, actions } = usePomodoroState();

  const handleOpenSettings = () => {
    actions.setShowSettings(true);
  };

  const handleCloseSettings = () => {
    actions.setShowSettings(false);
  };

  const handleOpenTimerSettings = () => {
    actions.setShowTimer(true);
  };

  const handleCloseTimerSettings = () => {
    actions.setShowTimer(false);
  };

  return (
    <div className="app">
      {/* Header with icon and controls */}
      <header className="app-header">
        <div className="header-content">
          <PomodoroIcon
            timeSeconds={state.timeSeconds}
            flowType={state.flowType}
            className="header-icon"
          />
          <h1 className="app-title">Pomodoro Timer</h1>
          <div className="header-controls">
            <button
              className="header-button"
              onClick={handleOpenTimerSettings}
              aria-label="Timer settings"
              type="button"
            >
              ⏱️
            </button>
            <button
              className="header-button"
              onClick={handleOpenSettings}
              aria-label="Settings"
              type="button"
            >
              ⚙️
            </button>
          </div>
        </div>
      </header>

      {/* Main timer view */}
      <main className="app-main">
        <AnimationView
          timeSeconds={state.timeSeconds}
          flowType={state.flowType}
          isPlaying={state.isPlaying}
          onToggleTimer={actions.toggleTimer}
          onResetTimer={actions.resetTimer}
          onSkipToNext={actions.skipToNext}
          onAdjustTime={actions.adjustTime}
          onSnapToNearestMinute={actions.snapToNearestMinute}
        />

        {/* Progress indicator */}
        <div className="progress-section">
          <div className="progress-label">
            Session Progress
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(100, (state.currentCompletedIntervals / state.requiredCompletedIntervals) * 100)}%`
              }}
            />
          </div>
          <div className="progress-text">
            {state.currentCompletedIntervals} / {state.requiredCompletedIntervals} intervals
          </div>
        </div>

        {/* Current session info */}
        <div className="session-info">
          <div className="session-card">
            <div className="session-title">Current Session</div>
            <div className="session-type">{state.flowType}</div>
            <div className="session-stats">
              <div className="stat-item">
                <span className="stat-label">Completed</span>
                <span className="stat-value">{state.currentCompletedIntervals}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Remaining</span>
                <span className="stat-value">
                  {Math.max(0, state.requiredCompletedIntervals - state.currentCompletedIntervals)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      <Modal
        isOpen={state.showSettings}
        onClose={handleCloseSettings}
      >
        <SettingsView
          state={state}
          onUpdateSettings={actions.updateSettings}
        />
      </Modal>

      {/* Timer Settings Modal */}
      <Modal
        isOpen={state.showTimer}
        onClose={handleCloseTimerSettings}
      >
        <div className="timer-settings">
          <h2 className="modal-title">Timer Settings</h2>
          <div className="quick-presets">
            <h3 className="preset-title">Quick Presets</h3>
            <div className="preset-buttons">
              <button
                className="preset-button"
                onClick={() => actions.updateSettings({
                  focusTimeIntervalMinutes: 25,
                  restTimeIntervalMinutes: 5,
                  longRestTimeIntervalMinutes: 15
                })}
              >
                Classic (25/5/15)
              </button>
              <button
                className="preset-button"
                onClick={() => actions.updateSettings({
                  focusTimeIntervalMinutes: 45,
                  restTimeIntervalMinutes: 15,
                  longRestTimeIntervalMinutes: 30
                })}
              >
                Extended (45/15/30)
              </button>
              <button
                className="preset-button"
                onClick={() => actions.updateSettings({
                  focusTimeIntervalMinutes: 15,
                  restTimeIntervalMinutes: 3,
                  longRestTimeIntervalMinutes: 10
                })}
              >
                Short (15/3/10)
              </button>
            </div>
          </div>

          <div className="timer-controls">
            <h3 className="controls-title">Manual Adjustment</h3>
            <div className="time-adjusters">
              <div className="time-adjuster">
                <span className="adjuster-label">-5 min</span>
                <button
                  className="adjuster-button"
                  onClick={() => actions.adjustTime(-300)}
                >
                  -5m
                </button>
              </div>
              <div className="time-adjuster">
                <span className="adjuster-label">-1 min</span>
                <button
                  className="adjuster-button"
                  onClick={() => actions.adjustTime(-60)}
                >
                  -1m
                </button>
              </div>
              <div className="time-adjuster">
                <span className="adjuster-label">+1 min</span>
                <button
                  className="adjuster-button"
                  onClick={() => actions.adjustTime(60)}
                >
                  +1m
                </button>
              </div>
              <div className="time-adjuster">
                <span className="adjuster-label">+5 min</span>
                <button
                  className="adjuster-button"
                  onClick={() => actions.adjustTime(300)}
                >
                  +5m
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Footer */}
      <footer className="app-footer">
        <p className="footer-text">
          Drag the timer to adjust time • Click settings to customize
        </p>
      </footer>
    </div>
  );
}

export default App;
