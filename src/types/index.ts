// User Types
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  isOnline: boolean;
  lastSeen?: Date;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
  originalText?: string;
  simplifiedText?: string;
  detectedEmotion?: string;
  summary?: string;
  voiceTranscript?: string;
}

// Chat Types
export interface Chat {
  id: string;
  participants: string[];
  lastMessage?: Message;
  lastMessageTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Accessibility Profile Types
export interface AccessibilityProfile {
  userId: string;
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  fontSizeValue: number; // px
  contrastMode: 'normal' | 'high';
  darkMode: boolean;
  textToSpeechEnabled: boolean;
  speechToTextEnabled: boolean;
  autoReadMessages: boolean;
  reduceMotion: boolean;
  screenReaderOptimized: boolean;
  language: string;
  voiceSettings: VoiceSettings;
  createdAt: Date;
  updatedAt: Date;
}

// Voice Settings
export interface VoiceSettings {
  volume: number; // 0-100
  rate: number; // 0.5-2.0
  pitch: number; // 0.5-2.0
  language: string;
  voiceIndex: number;
}

// AI Features Types
export interface AIFeatures {
  simplifyText: boolean;
  emotionDetection: boolean;
  autoSummarize: boolean;
  voiceToneDetection: boolean;
  suggestMessages: boolean;
}

// Translation Types
export interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
}

export interface TranslationResponse {
  originalText: string;
  translatedText: string;
  sourceLang: string;
  targetLang: string;
}

// Emotion Detection Types
export interface EmotionAnalysis {
  emotion: 'happy' | 'sad' | 'angry' | 'neutral' | 'confused' | 'excited';
  confidence: number; // 0-1
  sentiment: 'positive' | 'negative' | 'neutral';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
  timestamp: Date;
}

// Authentication Types
export interface AuthContext {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
}

// Accessibility Context Types
export interface AccessibilityContext {
  profile: AccessibilityProfile | null;
  loading: boolean;
  updateProfile: (profile: Partial<AccessibilityProfile>) => Promise<void>;
  resetToDefaults: () => Promise<void>;
}
