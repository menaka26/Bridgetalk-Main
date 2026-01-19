// Speech-to-Text Service
import { logger } from '@utils/index';

interface SpeechToTextOptions {
  language?: string;
  onError?: (error: any) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

class SpeechToTextService {
  private recognition: any = null;
  private supportedFlag = false;

  constructor() {
    // Check browser support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.supportedFlag = true;
      this.setupRecognition();
    } else {
      logger.warn('Speech Recognition API not supported in this browser');
    }
  }

  private setupRecognition(): void {
    if (!this.recognition) return;

    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
  }

  public isSupported(): boolean {
    return this.supportedFlag;
  }

  public start(
    onResult: (text: string, isFinal: boolean) => void,
    options?: SpeechToTextOptions
  ): void {
    if (!this.supportedFlag) {
      logger.warn('Speech Recognition not supported');
      options?.onError?.(new Error('Speech Recognition not supported'));
      return;
    }

    if (this.recognition) {
      this.recognition.lang = options?.language || 'en-US';

      this.recognition.onstart = () => {
        logger.log('Speech recognition started');
        options?.onStart?.();
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            onResult(transcript, true);
          } else {
            interimTranscript += transcript;
          }
        }

        if (interimTranscript) {
          onResult(interimTranscript, false);
        }
      };

      this.recognition.onerror = (event: any) => {
        logger.error('Speech recognition error', event.error);
        options?.onError?.(event.error);
      };

      this.recognition.onend = () => {
        logger.log('Speech recognition ended');
        options?.onEnd?.();
      };

      this.recognition.start();
    }
  }

  public stop(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  public abort(): void {
    if (this.recognition) {
      this.recognition.abort();
    }
  }
}

export default new SpeechToTextService();
