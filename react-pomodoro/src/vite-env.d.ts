/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_DESCRIPTION: string;
  // Add more env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Extend Window interface for any global properties
declare global {
  interface Window {
    // Add any global window properties here
  }
}

// Audio Context types for better TypeScript support
declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export {};
