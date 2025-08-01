# Pomodoro Timer

A beautiful and functional Pomodoro timer available as both a native macOS menubar app and a modern React web application.

## 🍅 Features

- **⏱️ Customizable Timer**: Focus and break sessions with intuitive controls
- **🔊 Audio Notifications**: Customizable volume for session completion alerts
- **🎨 Beautiful UI**: Clean, modern interface with smooth animations
- **🍎 Native macOS Integration**: Lives in your menubar for quick access
- **🌐 Cross-Platform Web App**: Full-featured browser version for any device

## 📱 Platforms

### macOS Menubar App
A lightweight native application that integrates seamlessly with your macOS system, providing quick access to your Pomodoro timer directly from the menubar.

### React Web App
A full-featured web application built with modern React and TypeScript, offering the complete Pomodoro experience in any browser with responsive design for desktop, tablet, and mobile devices.

## 🚀 Getting Started

### macOS App

#### Prerequisites
- macOS 12.0 (Monterey) or later
- Xcode 14.0 or later (for building from source)

#### Installation

**Option 1: Build from Source**
1. Clone this repository
2. Open `Pomodoro/Pomodoro.xcodeproj` in Xcode
3. Select your development team in the project settings
4. Build and run the project (⌘+R)
5. The app will appear in your menubar

**Running the App**
- The Pomodoro timer icon will appear in your macOS menubar
- Left-click to open the timer interface
- Right-click to access the quit menu
- The app runs silently in the background and provides notifications when sessions complete

#### macOS App Features
- **Menubar Integration**: Unobtrusive presence in your system
- **System Notifications**: Native macOS notifications for session transitions
- **Background Operation**: Continues running even when not visible
- **Quick Access**: One-click timer control from anywhere
- **Low Resource Usage**: Minimal impact on system performance

### React Web App

#### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

#### Installation

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

4. Open your browser and visit `http://localhost:5173`

#### Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

To preview the production build locally:
```bash
npm run preview
```

#### React App Features
- **Cross-Platform**: Works on any device with a modern browser
- **Progressive Web App**: Can be installed on mobile devices
- **Responsive Design**: Adapts to all screen sizes automatically
- **Touch Support**: Full mobile and tablet support with gesture controls
- **Keyboard Navigation**: Complete accessibility with keyboard shortcuts
- **Local Storage**: Settings persist between browser sessions

## 🎮 Usage

### Basic Timer Operations

**macOS App:**
- Left-click the menubar icon to open the timer
- Use the play/pause button to control the timer
- Drag the timer circle to adjust time manually
- Access settings through the popup interface

**React Web App:**
- Click the play/pause button or press spacebar to start/stop
- Drag the timer circle left or right to adjust time
- Use the reset button to return to original time
- Click the forward button to skip to the next session

### Timer Modes

- **Focus Session**: Your main work period (default: 25 minutes)
- **Short Break**: Brief rest between focus sessions (default: 5 minutes)

### Settings Configuration

**Timer Durations:**
- Customize focus, short break, and long break durations
- Set the number of focus sessions before a long break
- Configure auto-advance between sessions

**Audio Settings:**
- Adjust notification volume (0-100%)
- Test notification sounds
- Enable/disable audio alerts

**Advanced Options:**
- Auto-start next session

## 🛠️ Development

### macOS Development

**Requirements:**
- Xcode 14.0+
- Swift 5.7+
- macOS 12.0+ deployment target

### React Development

**Tech Stack:**
- React 18+ with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Icons for iconography

**Development Commands:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## 🤝 Contributing

We welcome contributions to both the macOS and React versions of the app!

### Development Setup
1. Fork the repository
2. Clone your fork locally
3. Create a feature branch: `git checkout -b feature-name`
4. Make your changes and test thoroughly
5. Commit with clear messages: `git commit -m "Add feature description"`
6. Push to your fork: `git push origin feature-name`
7. Create a pull request

### Code Style
- **Swift**: Follow Swift API Design Guidelines
- **TypeScript/React**: Use ESLint and Prettier configurations
- **Commits**: Use conventional commit format

## 📄 License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.

## 📞 Support

For issues, feature requests, or questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the documentation in each platform's directory

---

**Made with ❤️ for productivity enthusiasts**
