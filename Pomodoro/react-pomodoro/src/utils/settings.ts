import { SettingsKeys } from "../types";

export { SettingsKeys };

// Default settings that match the Swift implementation
export const DEFAULT_SETTINGS = {
  [SettingsKeys.REQUIRED_COMPLETED_INTERVALS]: 8,
  [SettingsKeys.AUTOMATICALLY_GO_FROM_FOCUS]: true,
  [SettingsKeys.AUTOMATICALLY_GO_FROM_REST]: true,
  [SettingsKeys.AUTOMATICALLY_GO_FROM_LONG_REST]: true,
  [SettingsKeys.FOCUS_TIME_INTERVAL_MINUTES]: 25,
  [SettingsKeys.REST_TIME_INTERVAL_MINUTES]: 5,
  [SettingsKeys.LONG_REST_TIME_INTERVAL_MINUTES]: 15,
  [SettingsKeys.PING_VOLUME]: 0.5,
};

// Type for setting values
type SettingValue = boolean | number;

/**
 * Get a setting value from localStorage with fallback to default
 */
export const getSetting = <T extends SettingValue>(key: SettingsKeys): T => {
  try {
    const stored = localStorage.getItem(key);
    if (stored === null) {
      return DEFAULT_SETTINGS[key] as T;
    }

    // Parse the stored value based on the default type
    const defaultValue = DEFAULT_SETTINGS[key];
    if (typeof defaultValue === "boolean") {
      return JSON.parse(stored) as T;
    } else if (typeof defaultValue === "number") {
      return parseFloat(stored) as T;
    }

    return stored as unknown as T;
  } catch (error) {
    console.warn(`Failed to get setting ${key}:`, error);
    return DEFAULT_SETTINGS[key] as T;
  }
};

/**
 * Set a setting value in localStorage
 */
export const setSetting = (key: SettingsKeys, value: SettingValue): void => {
  try {
    if (typeof value === "boolean") {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value.toString());
    }
  } catch (error) {
    console.warn(`Failed to set setting ${key}:`, error);
  }
};

/**
 * Get all settings as an object
 */
export const getAllSettings = () => {
  return {
    requiredCompletedIntervals: getSetting<number>(
      SettingsKeys.REQUIRED_COMPLETED_INTERVALS,
    ),
    automaticallyGoFromFocus: getSetting<boolean>(
      SettingsKeys.AUTOMATICALLY_GO_FROM_FOCUS,
    ),
    automaticallyGoFromRest: getSetting<boolean>(
      SettingsKeys.AUTOMATICALLY_GO_FROM_REST,
    ),
    automaticallyGoFromLongRest: getSetting<boolean>(
      SettingsKeys.AUTOMATICALLY_GO_FROM_LONG_REST,
    ),
    focusTimeIntervalMinutes: getSetting<number>(
      SettingsKeys.FOCUS_TIME_INTERVAL_MINUTES,
    ),
    restTimeIntervalMinutes: getSetting<number>(
      SettingsKeys.REST_TIME_INTERVAL_MINUTES,
    ),
    longRestTimeIntervalMinutes: getSetting<number>(
      SettingsKeys.LONG_REST_TIME_INTERVAL_MINUTES,
    ),
    pingVolume: getSetting<number>(SettingsKeys.PING_VOLUME),
  };
};

/**
 * Reset all settings to defaults
 */
export const resetAllSettings = (): void => {
  try {
    Object.keys(DEFAULT_SETTINGS).forEach((key) => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.warn("Failed to reset settings:", error);
  }
};

/**
 * Export settings to JSON string
 */
export const exportSettings = (): string => {
  return JSON.stringify(getAllSettings(), null, 2);
};

/**
 * Import settings from JSON string
 */
export const importSettings = (settingsJson: string): boolean => {
  try {
    const settings = JSON.parse(settingsJson);

    // Validate and set each setting
    Object.entries(settings).forEach(([key, value]) => {
      const settingsKey = key as SettingsKeys;
      if (
        settingsKey in DEFAULT_SETTINGS &&
        typeof value === typeof DEFAULT_SETTINGS[settingsKey]
      ) {
        setSetting(settingsKey, value as SettingValue);
      }
    });

    return true;
  } catch (error) {
    console.warn("Failed to import settings:", error);
    return false;
  }
};
