// Flow types for different timer modes
export enum FlowType {
  FOCUS = 'Focus',
  REST = 'Break'
}

// Time magnification factors for Rive animations
export enum TimeToMagnify {
  TIME_0 = 'time0',
  TIME_5 = 'time5',
  TIME_10 = 'time10',
  TIME_15 = 'time15',
  TIME_20 = 'time20'
}

// Main application state interface
export interface PomodoroState {
  // Timer state
  timeSeconds: number;
  flowType: FlowType;
  isPlaying: boolean;
  currentCompletedIntervals: number;

  // Settings
  automaticallyGoFromFocus: boolean;
  automaticallyGoFromRest: boolean;
  automaticallyGoFromLongRest: boolean;
  requiredCompletedIntervals: number;
  focusTimeIntervalMinutes: number;
  restTimeIntervalMinutes: number;
  longRestTimeIntervalMinutes: number;
  pingVolume: number;

  // UI state
  isPopoverShown: boolean;
  showFabMenu: boolean;
  showSettings: boolean;
  showTimer: boolean;
}

// Settings keys for localStorage
export enum SettingsKeys {
  REQUIRED_COMPLETED_INTERVALS = 'requiredCompletedIntervals',
  AUTOMATICALLY_GO_FROM_FOCUS = 'automaticallyGoFromFocus',
  AUTOMATICALLY_GO_FROM_REST = 'automaticallyGoFromRest',
  AUTOMATICALLY_GO_FROM_LONG_REST = 'automaticallyGoFromLongRest',
  FOCUS_TIME_INTERVAL_MINUTES = 'focusTimeIntervalMinutes',
  REST_TIME_INTERVAL_MINUTES = 'restTimeIntervalMinutes',
  LONG_REST_TIME_INTERVAL_MINUTES = 'longRestTimeIntervalMinutes',
  PING_VOLUME = 'pingVolume'
}

// Action types for state management
export enum ActionType {
  SET_TIME_SECONDS = 'SET_TIME_SECONDS',
  SET_FLOW_TYPE = 'SET_FLOW_TYPE',
  SET_IS_PLAYING = 'SET_IS_PLAYING',
  SET_COMPLETED_INTERVALS = 'SET_COMPLETED_INTERVALS',
  SET_AUTOMATICALLY_GO_FROM_FOCUS = 'SET_AUTOMATICALLY_GO_FROM_FOCUS',
  SET_AUTOMATICALLY_GO_FROM_REST = 'SET_AUTOMATICALLY_GO_FROM_REST',
  SET_AUTOMATICALLY_GO_FROM_LONG_REST = 'SET_AUTOMATICALLY_GO_FROM_LONG_REST',
  SET_REQUIRED_COMPLETED_INTERVALS = 'SET_REQUIRED_COMPLETED_INTERVALS',
  SET_FOCUS_TIME_INTERVAL_MINUTES = 'SET_FOCUS_TIME_INTERVAL_MINUTES',
  SET_REST_TIME_INTERVAL_MINUTES = 'SET_REST_TIME_INTERVAL_MINUTES',
  SET_LONG_REST_TIME_INTERVAL_MINUTES = 'SET_LONG_REST_TIME_INTERVAL_MINUTES',
  SET_PING_VOLUME = 'SET_PING_VOLUME',
  SET_IS_POPOVER_SHOWN = 'SET_IS_POPOVER_SHOWN',
  SET_SHOW_FAB_MENU = 'SET_SHOW_FAB_MENU',
  SET_SHOW_SETTINGS = 'SET_SHOW_SETTINGS',
  SET_SHOW_TIMER = 'SET_SHOW_TIMER',
  RESET_TIMER = 'RESET_TIMER',
  SKIP_TO_NEXT_FLOW_TYPE = 'SKIP_TO_NEXT_FLOW_TYPE'
}

// Action interfaces
export interface SetTimeSecondsAction {
  type: ActionType.SET_TIME_SECONDS;
  payload: number;
}

export interface SetFlowTypeAction {
  type: ActionType.SET_FLOW_TYPE;
  payload: FlowType;
}

export interface SetIsPlayingAction {
  type: ActionType.SET_IS_PLAYING;
  payload: boolean;
}

export interface SetCompletedIntervalsAction {
  type: ActionType.SET_COMPLETED_INTERVALS;
  payload: number;
}

export interface SetBooleanSettingAction {
  type: ActionType.SET_AUTOMATICALLY_GO_FROM_FOCUS |
        ActionType.SET_AUTOMATICALLY_GO_FROM_REST |
        ActionType.SET_AUTOMATICALLY_GO_FROM_LONG_REST |
        ActionType.SET_IS_POPOVER_SHOWN |
        ActionType.SET_SHOW_FAB_MENU |
        ActionType.SET_SHOW_SETTINGS |
        ActionType.SET_SHOW_TIMER;
  payload: boolean;
}

export interface SetNumberSettingAction {
  type: ActionType.SET_REQUIRED_COMPLETED_INTERVALS |
        ActionType.SET_FOCUS_TIME_INTERVAL_MINUTES |
        ActionType.SET_REST_TIME_INTERVAL_MINUTES |
        ActionType.SET_LONG_REST_TIME_INTERVAL_MINUTES |
        ActionType.SET_PING_VOLUME;
  payload: number;
}

export interface ResetTimerAction {
  type: ActionType.RESET_TIMER;
}

export interface SkipToNextFlowTypeAction {
  type: ActionType.SKIP_TO_NEXT_FLOW_TYPE;
}

export type PomodoroAction =
  | SetTimeSecondsAction
  | SetFlowTypeAction
  | SetIsPlayingAction
  | SetCompletedIntervalsAction
  | SetBooleanSettingAction
  | SetNumberSettingAction
  | ResetTimerAction
  | SkipToNextFlowTypeAction;

// Component props interfaces
export interface AnimationButtonProps {
  action: () => void;
  iconName: string;
  isDisabled: boolean;
}

export interface TimerIconProps {
  timeSeconds: number;
  flowType: FlowType;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  onChangeComplete?: (value: number) => void;
}
