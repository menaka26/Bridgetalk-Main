# BridgeTalk - Inclusive AI-Powered Chat Platform

An accessible, real-time chat application designed with blind and visually impaired users in mind, while remaining fully usable by everyone.

## 🎯 Features

### Core Chat Features
- ✅ Real-time one-to-one messaging with Firebase Firestore
- ✅ Message history and persistence
- ✅ Instant message updates using real-time listeners
- ✅ Online/offline status tracking
- ✅ Message timestamps and read receipts

### 🎤 Voice Features
- ✅ **Speech-to-Text**: Convert voice to chat messages using Web Speech API
- ✅ **Text-to-Speech**: Automatic reading of received messages
- ✅ **Voice Input Activation**: Double-tap or button-based voice input
- ✅ **Customizable Voice Settings**: Rate, pitch, volume, language

### ✨ AI-Powered Features (Google Gemini)
- ✅ **Message Simplification**: Convert complex text to easy-to-understand language
- ✅ **Emotion Detection**: Identify emotions in messages
- ✅ **Auto-Summarization**: Condense long messages
- ✅ **Message Suggestions**: AI-powered response suggestions
- ✅ **Accessible AI Actions**: Clearly labeled buttons with spoken feedback

### ♿ Accessibility Features
- ✅ **WCAG 2.1 Level AAA Compliance**
- ✅ **Screen Reader Support** (NVDA, JAWS, VoiceOver, TalkBack)
- ✅ **Keyboard Navigation**: Full keyboard support
- ✅ **Accessibility Profile**:
  - Adjustable font sizes (12px - 32px+)
  - High contrast mode
  - Dark mode
  - Reduced motion
  - Screen reader optimization
- ✅ **Color-Blind Friendly Palette**
- ✅ **Minimum 7:1 Contrast Ratio** (AAA standard)
- ✅ **Touch-Friendly**: 44x44px minimum touch targets
- ✅ **Language Support**: Multiple languages for voice and UI

### 📱 Multi-Platform Support
- ✅ Responsive web design (mobile, tablet, desktop)
- ✅ Touch and keyboard-friendly interactions
- ✅ Adaptive layouts for all screen sizes
- ✅ Mobile browser compatibility

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- Firebase account (free tier available)
- Google Cloud API keys (optional: for advanced features)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd BridgeTalk
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Firebase and Google Cloud API keys:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
# ... other variables
```

4. **Start development server**
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 📁 Project Structure

```
BridgeTalk/
├── public/                      # Static assets
├── src/
│   ├── components/             # React components
│   │   ├── Chat/              # Chat-related components
│   │   ├── Home/              # Home/Auth components
│   │   ├── Settings/          # Settings components
│   │   ├── Accessibility/     # Accessibility components
│   │   └── Common/            # Reusable components
│   ├── pages/                  # Page components
│   ├── services/               # Business logic
│   │   ├── firebase/          # Firebase services
│   │   ├── speech/            # Voice services
│   │   ├── ai/                # AI services
│   │   └── translation/       # Translation services
│   ├── hooks/                  # Custom React hooks
│   ├── context/                # React Context providers
│   ├── utils/                  # Utility functions
│   ├── constants/              # App constants
│   ├── types/                  # TypeScript types
│   ├── styles/                 # Global styles
│   ├── App.tsx                 # Root component
│   └── main.tsx                # Entry point
├── tests/                       # Test files
├── .env.example                # Environment variables template
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite config
└── README.md                   # This file
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev                 # Start dev server

# Production
npm run build              # Build for production
npm run preview            # Preview production build

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format with Prettier
npm run type-check         # Check TypeScript types

# Testing
npm run test               # Run unit tests
npm run test:ui            # Run tests with UI
npm run test:coverage      # Generate coverage report
npm run e2e                # Run E2E tests

# Accessibility
npm run accessibility-audit # Run accessibility audit
```

## 🎨 Customization

### Accessibility Settings
Users can customize their experience via the Settings panel:
- **Font Size**: small, medium, large, extra-large
- **Contrast Mode**: normal, high
- **Dark Mode**: on/off
- **Text-to-Speech**: on/off with custom voice settings
- **Speech-to-Text**: on/off
- **Auto-Read Messages**: on/off

### Keyboard Shortcuts
- **Enter**: Send message
- **Shift + Enter**: New line
- **Alt + V**: Toggle voice input
- **Ctrl + ,**: Open settings
- **?**: Show help

## 🔐 Security & Privacy

- Firebase Authentication for secure login
- Firebase Firestore security rules
- HTTPS/TLS encryption in transit
- Input validation and sanitization
- No third-party tracking
- GDPR compliant

## 📊 Testing

### Unit Tests
```bash
npm run test
```

### Accessibility Testing
```bash
npm run accessibility-audit
```

### E2E Tests
```bash
npm run e2e
```

### Coverage Report
```bash
npm run test:coverage
```

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile: Chrome, Firefox, Safari (iOS/Android)

## 🎯 Accessibility Compliance

- **WCAG 2.1 Level AAA**: Full compliance
- **Section 508**: Compliant
- **ADA**: Compliant
- **Screen Readers**: VoiceOver, NVDA, JAWS, TalkBack
- **Keyboard Navigation**: Fully supported
- **High Contrast**: Supported

## 📚 Documentation

### For Developers
- [Architecture Guide](./docs/ARCHITECTURE.md)
- [API Documentation](./docs/API.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

### For Users
- [User Guide](./docs/USER_GUIDE.md)
- [Accessibility Features](./docs/ACCESSIBILITY.md)
- [Keyboard Shortcuts](./docs/KEYBOARD_SHORTCUTS.md)
- [FAQ](./docs/FAQ.md)

## 🚀 Deployment

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Vercel
```bash
vercel
```

### Netlify
```bash
netlify deploy
```

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## 📝 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and TypeScript
- Powered by Firebase and Google Cloud APIs
- Designed with accessibility as a core principle
- Inspired by the needs of blind and visually impaired users

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: support@bridgetalk.app
- Accessibility feedback: a11y@bridgetalk.app

## 🌟 Roadmap

### Version 1.1
- [ ] Group chat support
- [ ] Message reactions/emojis
- [ ] Chat search functionality
- [ ] User presence indicators

### Version 1.2
- [ ] Voice messaging
- [ ] File sharing with audio descriptions
- [ ] Message scheduling
- [ ] Advanced translation

### Version 2.0
- [ ] Video/audio calls
- [ ] End-to-end encryption
- [ ] Mobile app (React Native)
- [ ] Advanced AI features

---

**BridgeTalk**: Making chat accessible to everyone, everywhere. 🌉
