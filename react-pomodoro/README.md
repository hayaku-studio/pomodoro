# Pomodoro Timer - React TypeScript Version

A beautiful and functional Pomodoro timer web application converted from the original macOS SwiftUI app. This React TypeScript version maintains all the core functionality while adapting the interface for web browsers.

## Features

- ⏱️ **Customizable Timer**: Focus and break sessions with drag-to-adjust functionality
- 🎯 **Multiple Modes**: Focus time and break time with automatic transitions
- 🔊 **Audio Notifications**: Customizable volume for session completion alerts
- 📊 **Progress Tracking**: Visual progress indicators for completed intervals
- ⚙️ **Flexible Settings**: Customize timer durations, auto-advance behavior, and more
- 🎨 **Beautiful UI**: Glassmorphism design with smooth animations
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ♿ **Accessibility**: Full keyboard navigation and screen reader support
- 🌙 **Dark Mode Support**: Automatically adapts to system preferences

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the React app directory:

```bash
cd Pomodoro/react-pomodoro
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

To preview the production build locally:

```bash
npm run preview
```

## Usage

### Basic Timer Operations

- **Start/Pause**: Click the play/pause button or press spacebar
- **Reset**: Click the reset button to return to the original time
- **Skip**: Click the forward button to advance to the next session
- **Adjust Time**: Drag the timer circle left or right to adjust time manually

### Settings

Access settings by clicking the gear icon (⚙️) in the header:

- **Volume Control**: Adjust notification sound volume (0-100%)
- **Timer Durations**: Set custom focus, break, and long break times
- **Auto-advance**: Configure automatic transitions between sessions
- **Intervals**: Set how many focus sessions before a long break

### Quick Timer Adjustments

Click the timer icon (⏱️) in the header for quick presets:

- **Classic**: 25 min focus / 5 min break / 15 min long break
- **Extended**: 45 min focus / 15 min break / 30 min long break
- **Short**: 15 min focus / 3 min break / 10 min long break

Manual adjustments are also available with +/-1 min and +/-5 min buttons.

## Key Differences from macOS Version

### Web Adaptations

- **No Menu Bar**: The timer runs in a full browser window instead of the menu bar
- **Browser Audio**: Uses Web Audio API instead of AVAudioPlayer
- **Local Storage**: Settings persist using browser localStorage instead of UserDefaults
- **Touch Support**: Full mobile and tablet support with touch gestures
- **Progressive Web App**: Can be installed on mobile devices and desktop

### Enhanced Features

- **Responsive Design**: Adapts to all screen sizes automatically
- **Keyboard Navigation**: Full accessibility with tab navigation
- **Visual Progress**: Enhanced progress indicators and session information
- **Quick Presets**: Preset timer configurations for common workflows

## Architecture

### Component Structure

```
src/
├── components/          # React components
│   ├── AnimationView.tsx       # Main timer interface with controls
│   ├── AnimationButton.tsx     # Timer control buttons
│   ├── Modal.tsx              # Modal container component
│   ├── PomodoroIcon.tsx       # Timer icon display
│   └── SettingsView.tsx       # Settings configuration
├── hooks/              # Custom React hooks
│   └── usePomodoroState.ts    # Main state management
├── types/              # TypeScript type definitions
│   └── index.ts              # All interfaces and enums
├── utils/              # Utility functions
│   ├── rive.ts              # Animation calculations
│   ├── settings.ts          # Settings persistence
│   └── sound.ts             # Audio management
└── styles/             # CSS modules
    ├── App.css
    ├── AnimationView.css
    ├── AnimationButton.css
    ├── Modal.css
    ├── PomodoroIcon.css
    ├── SettingsView.css
    └── index.css
```

### State Management

The app uses React's `useReducer` hook for state management, providing:

- **Centralized State**: All timer and settings state in one place
- **Type Safety**: Full TypeScript integration with strict typing
- **Persistence**: Automatic saving of settings to localStorage
- **Actions**: Clean action-based state updates

### Audio System

Custom Web Audio API implementation that:

- **Generates Tones**: Creates notification sounds programmatically
- **Volume Control**: Respects user volume preferences
- **Browser Compatibility**: Works across all modern browsers
- **Custom Sounds**: Supports loading custom audio files

## Browser Compatibility

- **Chrome**: 88+
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 88+

## Performance Considerations

- **Lazy Loading**: Components load only when needed
- **Optimized Animations**: CSS transforms and GPU acceleration
- **Memory Management**: Proper cleanup of timers and event listeners
- **Bundle Size**: Optimized Vite build with code splitting and tree shaking

## Customization

### Styling

The app uses CSS custom properties for easy theming:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #4ade80;
  /* ... */
}
```

### Adding Custom Sounds

Replace the generated notification sound:

```typescript
import { soundManager } from "./utils/sound";

// Load custom sound file
soundManager.loadCustomSound("/path/to/your/sound.mp3");
```

## Deployment

### Static Hosting

The app can be deployed to any static hosting service:

- **Netlify**: `npm run build` then drag the dist folder
- **Vercel**: Connect your GitHub repository (auto-detects Vite)
- **GitHub Pages**: Use the gh-pages package with dist folder
- **AWS S3**: Upload dist files to an S3 bucket

### Environment Variables

Create a `.env` file for configuration:

```
VITE_APP_VERSION=1.0.0
VITE_ANALYTICS_ID=your-id
```

Note: Vite uses `VITE_` prefix instead of `REACT_APP_` for environment variables.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit with clear messages: `git commit -m "Add feature"`
5. Push to your fork: `git push origin feature-name`
6. Create a pull request

## License

This project maintains the same license as the original macOS application.

## Acknowledgments

- Original macOS SwiftUI implementation
- React and TypeScript communities
- Web Audio API documentation and examples
- Accessibility guidelines from WCAG 2.1

## Support

For issues and feature requests, please use the GitHub issue tracker or contact the development team.
