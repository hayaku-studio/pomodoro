import React from 'react';
import { PomodoroState } from '../types';
import { playSound } from '../utils/sound';
import '../styles/SettingsView.css';

interface SettingsViewProps {
  state: PomodoroState;
  onUpdateSettings: (settings: Partial<PomodoroState>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  state,
  onUpdateSettings
}) => {
  const handleVolumeChange = (value: number) => {
    onUpdateSettings({ pingVolume: value });
  };

  const handleVolumeChangeComplete = (value: number) => {
    onUpdateSettings({ pingVolume: value });
    playSound(value);
  };

  const handleTimeIntervalChange = (key: keyof PomodoroState, value: number) => {
    onUpdateSettings({ [key]: value });
  };

  const handleBooleanSettingChange = (key: keyof PomodoroState, value: boolean) => {
    onUpdateSettings({ [key]: value });
  };

  return (
    <div className="settings-view">
      <h1 className="settings-title">Settings</h1>

      <div className="settings-sections">
        {/* Volume Settings */}
        <div className="settings-section">
          <h3 className="section-title">PING VOLUME</h3>
          <div className="setting-card">
            <div className="volume-control">
              <div className="volume-icon">🔈</div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={state.pingVolume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                onMouseUp={(e) => handleVolumeChangeComplete(parseFloat((e.target as HTMLInputElement).value))}
                onTouchEnd={(e) => handleVolumeChangeComplete(parseFloat((e.target as HTMLInputElement).value))}
                className="volume-slider"
                aria-label="Notification volume"
              />
              <div className="volume-icon">🔊</div>
            </div>
            <div className="volume-percentage">
              {Math.round(state.pingVolume * 100)}%
            </div>
          </div>
        </div>

        {/* Timer Duration Settings */}
        <div className="settings-section">
          <h3 className="section-title">TIMER DURATIONS</h3>

          <div className="setting-card">
            <label className="setting-label">
              <span className="label-text">Focus Time (minutes)</span>
              <input
                type="number"
                min="1"
                max="90"
                value={state.focusTimeIntervalMinutes}
                onChange={(e) => handleTimeIntervalChange('focusTimeIntervalMinutes', parseInt(e.target.value) || 25)}
                className="number-input"
              />
            </label>
          </div>

          <div className="setting-card">
            <label className="setting-label">
              <span className="label-text">Break Time (minutes)</span>
              <input
                type="number"
                min="1"
                max="30"
                value={state.restTimeIntervalMinutes}
                onChange={(e) => handleTimeIntervalChange('restTimeIntervalMinutes', parseInt(e.target.value) || 5)}
                className="number-input"
              />
            </label>
          </div>

          <div className="setting-card">
            <label className="setting-label">
              <span className="label-text">Long Break Time (minutes)</span>
              <input
                type="number"
                min="5"
                max="60"
                value={state.longRestTimeIntervalMinutes}
                onChange={(e) => handleTimeIntervalChange('longRestTimeIntervalMinutes', parseInt(e.target.value) || 15)}
                className="number-input"
              />
            </label>
          </div>
        </div>

        {/* Auto-advance Settings */}
        <div className="settings-section">
          <h3 className="section-title">AUTO-ADVANCE</h3>

          <div className="setting-card">
            <label className="setting-label checkbox-label">
              <input
                type="checkbox"
                checked={state.automaticallyGoFromFocus}
                onChange={(e) => handleBooleanSettingChange('automaticallyGoFromFocus', e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              <span className="label-text">Auto-advance from Focus</span>
            </label>
            <p className="setting-description">
              Automatically start break timer when focus session ends
            </p>
          </div>

          <div className="setting-card">
            <label className="setting-label checkbox-label">
              <input
                type="checkbox"
                checked={state.automaticallyGoFromRest}
                onChange={(e) => handleBooleanSettingChange('automaticallyGoFromRest', e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              <span className="label-text">Auto-advance from Break</span>
            </label>
            <p className="setting-description">
              Automatically start focus timer when break session ends
            </p>
          </div>

          <div className="setting-card">
            <label className="setting-label checkbox-label">
              <input
                type="checkbox"
                checked={state.automaticallyGoFromLongRest}
                onChange={(e) => handleBooleanSettingChange('automaticallyGoFromLongRest', e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkbox-custom"></span>
              <span className="label-text">Auto-advance from Long Break</span>
            </label>
            <p className="setting-description">
              Automatically start focus timer when long break session ends
            </p>
          </div>
        </div>

        {/* Interval Settings */}
        <div className="settings-section">
          <h3 className="section-title">INTERVALS</h3>

          <div className="setting-card">
            <label className="setting-label">
              <span className="label-text">Required Completed Intervals</span>
              <input
                type="number"
                min="1"
                max="20"
                value={state.requiredCompletedIntervals}
                onChange={(e) => handleTimeIntervalChange('requiredCompletedIntervals', parseInt(e.target.value) || 8)}
                className="number-input"
              />
            </label>
            <p className="setting-description">
              Number of focus sessions to complete before a long break
            </p>
          </div>
        </div>

        {/* Session Info */}
        <div className="settings-section">
          <h3 className="section-title">SESSION INFO</h3>

          <div className="setting-card">
            <div className="info-item">
              <span className="info-label">Current Completed Intervals:</span>
              <span className="info-value">{state.currentCompletedIntervals}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Progress:</span>
              <span className="info-value">
                {Math.round((state.currentCompletedIntervals / state.requiredCompletedIntervals) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
