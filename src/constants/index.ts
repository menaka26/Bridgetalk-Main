// Firebase Configuration Constants
export const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// API Keys
export const API_KEYS = {
  GOOGLE_GEMINI_API_KEY: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY,
  GOOGLE_CLOUD_SPEECH_API_KEY: import.meta.env.VITE_GOOGLE_CLOUD_SPEECH_API_KEY,
  GOOGLE_TRANSLATE_API_KEY: import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY,
};

// Firebase Collections
export const FIRESTORE_COLLECTIONS = {
  USERS: 'users',
  MESSAGES: 'messages',
  CHATS: 'chats',
  ACCESSIBILITY_PROFILES: 'accessibility_profiles',
} as const;

// Application Settings
export const APP_CONFIG = {
  APP_NAME: 'BridgeTalk',
  APP_ENV: import.meta.env.VITE_APP_ENV,
  LOG_LEVEL: import.meta.env.VITE_LOG_LEVEL,
  MESSAGE_PAGE_SIZE: 50,
  TYPING_INDICATOR_TIMEOUT: 3000,
};

// Accessibility Settings
export const ACCESSIBILITY_DEFAULTS = {
  fontSize: 'medium' as const,
  fontSizeValue: 16,
  contrastMode: 'normal' as const,
  darkMode: false,
  textToSpeechEnabled: true,
  speechToTextEnabled: true,
  autoReadMessages: true,
  reduceMotion: false,
  screenReaderOptimized: true,
  language: 'en',
};

// Voice Settings Defaults
export const VOICE_SETTINGS_DEFAULTS = {
  volume: 100,
  rate: 1.0,
  pitch: 1.0,
  language: 'en-US',
  voiceIndex: 0,
};

// Font Size Mappings
export const FONT_SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  'extra-large': 24,
  '4xl': 32,
} as const;

// UI Messages & Accessibility Labels
export const ARIA_LABELS = {
  SEND_MESSAGE: 'Send message',
  VOICE_INPUT: 'Activate voice input (double-tap)',
  AI_SIMPLIFY: 'Simplify message using AI',
  AI_TRANSLATE: 'Translate message',
  ACCESSIBILITY_SETTINGS: 'Open accessibility settings',
  DARK_MODE: 'Toggle dark mode',
  SETTINGS_MENU: 'Open settings menu',
  USER_MENU: 'Open user menu',
  BACK_BUTTON: 'Go back',
  CLOSE: 'Close',
};

// Error Messages
export const ERROR_MESSAGES = {
  AUTHENTICATION_FAILED: 'Authentication failed. Please try again.',
  MESSAGE_SEND_FAILED: 'Failed to send message. Please try again.',
  MESSAGE_LOAD_FAILED: 'Failed to load messages. Please try again.',
  VOICE_INPUT_FAILED: 'Voice input failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_INPUT: 'Invalid input. Please check and try again.',
  UNAUTHORIZED: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  MESSAGE_SENT: 'Message sent successfully',
  MESSAGE_RECEIVED: 'New message received',
  PROFILE_UPDATED: 'Profile updated successfully',
  ACCESSIBILITY_SETTINGS_UPDATED: 'Accessibility settings updated',
  LOGOUT_SUCCESS: 'Logged out successfully',
};

// Keyboard Shortcuts
export const KEYBOARD_SHORTCUTS = {
  SEND_MESSAGE: { key: 'Enter', ctrl: false, alt: false },
  NEW_MESSAGE: { key: 'N', ctrl: true, alt: false },
  SEARCH: { key: 'F', ctrl: true, alt: false },
  VOICE_INPUT: { key: 'V', ctrl: false, alt: true },
  SETTINGS: { key: ',', ctrl: true, alt: false },
  SHOW_HELP: { key: '?', ctrl: false, alt: false },
};

// Supported Languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese (Simplified)' },
  { code: 'ar', name: 'Arabic' },
];

// Emotions
export const EMOTIONS = [
  'happy',
  'sad',
  'angry',
  'neutral',
  'confused',
  'excited',
] as const;
