// Text-to-Speech Service
import { logger } from '@utils/index';

interface TextToSpeechOptions {
  rate?: number; // 0.5 to 2.0
  pitch?: number; // 0.5 to 2.0
  volume?: number; // 0 to 1
  language?: string;
  voiceIndex?: number;
}

class TextToSpeechService {
  private synthesis: SpeechSynthesis;
  private supportedFlag = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.supportedFlag = !!this.synthesis;

    if (!this.supportedFlag) {
      logger.warn('Text-to-Speech API not supported in this browser');
    }
  }

  public isSupported(): boolean {
    return this.supportedFlag;
  }

  public speak(
    text: string,
    options?: TextToSpeechOptions,
    onEnd?: () => void
  ): void {
    if (!this.supportedFlag) {
      logger.warn('Text-to-Speech not supported');
      return;
    }

    // Cancel any ongoing speech
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);

    // Get available voices
    const voices = this.synthesis.getVoices();
    if (voices.length > 0) {
      const voiceIndex = (options?.voiceIndex || 0) % voices.length;
      utterance.voice = voices[voiceIndex];
    }

    utterance.rate = options?.rate || 1.0;
    utterance.pitch = options?.pitch || 1.0;
    utterance.volume = options?.volume || 1.0;
    utterance.lang = options?.language || 'en-US';

    utterance.onstart = () => {
      logger.log('Text-to-Speech started');
    };

    utterance.onend = () => {
      logger.log('Text-to-Speech ended');
      this.currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = (event) => {
      logger.error('Text-to-Speech error', event.error);
      this.currentUtterance = null;
    };

    this.currentUtterance = utterance;
    this.synthesis.speak(utterance);
  }

  public stop(): void {
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
      this.currentUtterance = null;
    }
  }

  public pause(): void {
    if (this.synthesis.speaking && !this.synthesis.paused) {
      this.synthesis.pause();
    }
  }

  public resume(): void {
    if (this.synthesis.paused) {
      this.synthesis.resume();
    }
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return this.synthesis.getVoices();
  }

  public isSpeaking(): boolean {
    return this.synthesis.speaking;
  }
}

export default new TextToSpeechService();
