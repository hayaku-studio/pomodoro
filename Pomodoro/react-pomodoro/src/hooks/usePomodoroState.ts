import { useReducer, useEffect, useCallback, useRef } from "react";
import { PomodoroState, PomodoroAction, ActionType, FlowType } from "../types";
import { getAllSettings, setSetting, SettingsKeys } from "../utils/settings";
import { playSound } from "../utils/sound";

// Initial state factory
const createInitialState = (): PomodoroState => {
  const settings = getAllSettings();

  return {
    // Timer state
    timeSeconds: settings.focusTimeIntervalMinutes * 60,
    flowType: FlowType.FOCUS,
    isPlaying: false,
    currentCompletedIntervals: 0,

    // Settings from localStorage
    automaticallyGoFromFocus: settings.automaticallyGoFromFocus,
    automaticallyGoFromRest: settings.automaticallyGoFromRest,
    automaticallyGoFromLongRest: settings.automaticallyGoFromLongRest,
    requiredCompletedIntervals: settings.requiredCompletedIntervals,
    focusTimeIntervalMinutes: settings.focusTimeIntervalMinutes,
    restTimeIntervalMinutes: settings.restTimeIntervalMinutes,
    longRestTimeIntervalMinutes: settings.longRestTimeIntervalMinutes,
    pingVolume: settings.pingVolume,

    // UI state
    isPopoverShown: true, // Always true for web version
    showFabMenu: false,
    showSettings: false,
    showTimer: false,
  };
};

// Reducer function
const pomodoroReducer = (
  state: PomodoroState,
  action: PomodoroAction,
): PomodoroState => {
  switch (action.type) {
    case ActionType.SET_TIME_SECONDS:
      return { ...state, timeSeconds: action.payload };

    case ActionType.SET_FLOW_TYPE:
      return { ...state, flowType: action.payload };

    case ActionType.SET_IS_PLAYING:
      return { ...state, isPlaying: action.payload };

    case ActionType.SET_COMPLETED_INTERVALS:
      return { ...state, currentCompletedIntervals: action.payload };

    case ActionType.SET_AUTOMATICALLY_GO_FROM_FOCUS:
      setSetting(SettingsKeys.AUTOMATICALLY_GO_FROM_FOCUS, action.payload);
      return { ...state, automaticallyGoFromFocus: action.payload };

    case ActionType.SET_AUTOMATICALLY_GO_FROM_REST:
      setSetting(SettingsKeys.AUTOMATICALLY_GO_FROM_REST, action.payload);
      return { ...state, automaticallyGoFromRest: action.payload };

    case ActionType.SET_AUTOMATICALLY_GO_FROM_LONG_REST:
      setSetting(SettingsKeys.AUTOMATICALLY_GO_FROM_LONG_REST, action.payload);
      return { ...state, automaticallyGoFromLongRest: action.payload };

    case ActionType.SET_REQUIRED_COMPLETED_INTERVALS:
      setSetting(SettingsKeys.REQUIRED_COMPLETED_INTERVALS, action.payload);
      return { ...state, requiredCompletedIntervals: action.payload };

    case ActionType.SET_FOCUS_TIME_INTERVAL_MINUTES:
      setSetting(SettingsKeys.FOCUS_TIME_INTERVAL_MINUTES, action.payload);
      return { ...state, focusTimeIntervalMinutes: action.payload };

    case ActionType.SET_REST_TIME_INTERVAL_MINUTES:
      setSetting(SettingsKeys.REST_TIME_INTERVAL_MINUTES, action.payload);
      return { ...state, restTimeIntervalMinutes: action.payload };

    case ActionType.SET_LONG_REST_TIME_INTERVAL_MINUTES:
      setSetting(SettingsKeys.LONG_REST_TIME_INTERVAL_MINUTES, action.payload);
      return { ...state, longRestTimeIntervalMinutes: action.payload };

    case ActionType.SET_PING_VOLUME:
      setSetting(SettingsKeys.PING_VOLUME, action.payload);
      return { ...state, pingVolume: action.payload };

    case ActionType.SET_IS_POPOVER_SHOWN:
      return { ...state, isPopoverShown: action.payload };

    case ActionType.SET_SHOW_FAB_MENU:
      return { ...state, showFabMenu: action.payload };

    case ActionType.SET_SHOW_SETTINGS:
      return { ...state, showSettings: action.payload };

    case ActionType.SET_SHOW_TIMER:
      return { ...state, showTimer: action.payload };

    case ActionType.RESET_TIMER:
      let resetTimeSeconds: number;
      switch (state.flowType) {
        case FlowType.FOCUS:
          resetTimeSeconds = state.focusTimeIntervalMinutes * 60;
          break;
        case FlowType.REST:
          resetTimeSeconds = state.restTimeIntervalMinutes * 60;
          break;
        default:
          resetTimeSeconds = state.focusTimeIntervalMinutes * 60;
      }
      return { ...state, timeSeconds: resetTimeSeconds, isPlaying: false };

    case ActionType.SKIP_TO_NEXT_FLOW_TYPE:
      let newFlowType: FlowType;
      let newTimeSeconds: number;
      let newCompletedIntervals = state.currentCompletedIntervals;

      // Increment completed intervals
      newCompletedIntervals += 1;

      switch (state.flowType) {
        case FlowType.FOCUS:
          newFlowType = FlowType.REST;
          newTimeSeconds = state.restTimeIntervalMinutes * 60;
          break;
        case FlowType.REST:
        default:
          newFlowType = FlowType.FOCUS;
          newTimeSeconds = state.focusTimeIntervalMinutes * 60;
          break;
      }

      // Reset intervals if we've reached the required amount
      if (newCompletedIntervals > state.requiredCompletedIntervals) {
        newCompletedIntervals = 0;
      }

      return {
        ...state,
        flowType: newFlowType,
        timeSeconds: newTimeSeconds,
        currentCompletedIntervals: newCompletedIntervals,
        isPlaying: true, // Auto-start the next timer
      };

    default:
      return state;
  }
};

// Custom hook
export const usePomodoroState = () => {
  const [state, dispatch] = useReducer(
    pomodoroReducer,
    null,
    createInitialState,
  );

  // Use ref to avoid closure issues in callbacks
  const stateRef = useRef(state);
  stateRef.current = state;

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (state.isPlaying && state.timeSeconds > 0) {
      interval = setInterval(() => {
        dispatch({
          type: ActionType.SET_TIME_SECONDS,
          payload: state.timeSeconds - 1,
        });
      }, 1000);
    }

    // Cleanup interval
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [state.isPlaying, state.timeSeconds]);

  // Timer completion effect
  useEffect(() => {
    if (state.timeSeconds === 0 && state.isPlaying) {
      // Timer finished
      playSound(state.pingVolume);
      dispatch({ type: ActionType.SET_IS_PLAYING, payload: false });

      // Auto-advance logic
      const shouldAutoAdvance =
        (state.flowType === FlowType.FOCUS && state.automaticallyGoFromFocus) ||
        (state.flowType === FlowType.REST && state.automaticallyGoFromRest);

      if (shouldAutoAdvance) {
        setTimeout(() => {
          dispatch({ type: ActionType.SKIP_TO_NEXT_FLOW_TYPE });
        }, 1000); // Small delay before auto-advancing
      }
    }
  }, [
    state.timeSeconds,
    state.isPlaying,
    state.flowType,
    state.automaticallyGoFromFocus,
    state.automaticallyGoFromRest,
    state.pingVolume,
  ]);

  // Action creators
  const actions = {
    setTimeSeconds: useCallback((seconds: number) => {
      dispatch({ type: ActionType.SET_TIME_SECONDS, payload: seconds });
    }, []),

    setFlowType: useCallback((flowType: FlowType) => {
      dispatch({ type: ActionType.SET_FLOW_TYPE, payload: flowType });
    }, []),

    toggleTimer: useCallback(() => {
      if (state.timeSeconds > 0) {
        dispatch({
          type: ActionType.SET_IS_PLAYING,
          payload: !state.isPlaying,
        });
      }
    }, [state.isPlaying, state.timeSeconds]),

    resetTimer: useCallback(() => {
      dispatch({ type: ActionType.RESET_TIMER });
    }, []),

    skipToNext: useCallback(() => {
      dispatch({ type: ActionType.SKIP_TO_NEXT_FLOW_TYPE });
    }, []),

    setCompletedIntervals: useCallback((intervals: number) => {
      dispatch({
        type: ActionType.SET_COMPLETED_INTERVALS,
        payload: intervals,
      });
    }, []),

    updateSettings: useCallback((settings: Partial<PomodoroState>) => {
      Object.entries(settings).forEach(([key, value]) => {
        switch (key) {
          case "automaticallyGoFromFocus":
            dispatch({
              type: ActionType.SET_AUTOMATICALLY_GO_FROM_FOCUS,
              payload: value as boolean,
            });
            break;
          case "automaticallyGoFromRest":
            dispatch({
              type: ActionType.SET_AUTOMATICALLY_GO_FROM_REST,
              payload: value as boolean,
            });
            break;
          case "automaticallyGoFromLongRest":
            dispatch({
              type: ActionType.SET_AUTOMATICALLY_GO_FROM_LONG_REST,
              payload: value as boolean,
            });
            break;
          case "requiredCompletedIntervals":
            dispatch({
              type: ActionType.SET_REQUIRED_COMPLETED_INTERVALS,
              payload: value as number,
            });
            break;
          case "focusTimeIntervalMinutes":
            dispatch({
              type: ActionType.SET_FOCUS_TIME_INTERVAL_MINUTES,
              payload: value as number,
            });
            break;
          case "restTimeIntervalMinutes":
            dispatch({
              type: ActionType.SET_REST_TIME_INTERVAL_MINUTES,
              payload: value as number,
            });
            break;
          case "longRestTimeIntervalMinutes":
            dispatch({
              type: ActionType.SET_LONG_REST_TIME_INTERVAL_MINUTES,
              payload: value as number,
            });
            break;
          case "pingVolume":
            dispatch({
              type: ActionType.SET_PING_VOLUME,
              payload: value as number,
            });
            break;
        }
      });
    }, []),

    setShowFabMenu: useCallback((show: boolean) => {
      dispatch({ type: ActionType.SET_SHOW_FAB_MENU, payload: show });
    }, []),

    setShowSettings: useCallback((show: boolean) => {
      dispatch({ type: ActionType.SET_SHOW_SETTINGS, payload: show });
    }, []),

    setShowTimer: useCallback((show: boolean) => {
      dispatch({ type: ActionType.SET_SHOW_TIMER, payload: show });
    }, []),

    adjustTime: useCallback(
      (deltaSeconds: number) => {
        const newTime = Math.max(
          0,
          Math.min(5400, state.timeSeconds + deltaSeconds),
        ); // Max 90 minutes
        dispatch({ type: ActionType.SET_TIME_SECONDS, payload: newTime });
      },
      [state.timeSeconds],
    ),

    snapToNearestMinute: useCallback(() => {
      const currentTimeSeconds = stateRef.current.timeSeconds;
      const currentIsPlaying = stateRef.current.isPlaying;
      const nearestMinute = Math.round(currentTimeSeconds / 60) * 60;
      dispatch({ type: ActionType.SET_TIME_SECONDS, payload: nearestMinute });

      // Autostart timer if time is greater than 0 and not already playing (matches macOS behavior)
      if (nearestMinute > 0 && !currentIsPlaying) {
        setTimeout(() => {
          dispatch({ type: ActionType.SET_IS_PLAYING, payload: true });
        }, 10);
      }
    }, []),
  };

  return {
    state,
    actions,
  };
};
