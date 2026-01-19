// Translation Service
import { API_KEYS } from '@constants/index';
import { logger } from '@utils/index';
import type { TranslationRequest, TranslationResponse } from '@types';

class TranslationService {
  private apiKey: string;
  private apiEndpoint = 'https://translation.googleapis.com/language/translate/v2';

  constructor() {
    this.apiKey = API_KEYS.GOOGLE_TRANSLATE_API_KEY;

    if (!this.apiKey) {
      logger.warn('Google Translate API key not configured');
    }
  }

  /**
   * Translate text to target language
   */
  public async translate(request: TranslationRequest): Promise<TranslationResponse> {
    try {
      const params = new URLSearchParams({
        key: this.apiKey,
        q: request.text,
        source_language: request.sourceLang,
        target_language: request.targetLang,
      });

      const response = await fetch(`${this.apiEndpoint}?${params}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`Translation API error: ${response.statusText}`);
      }

      const data = await response.json();
      const translatedText = data.data?.translations?.[0]?.translatedText;

      if (!translatedText) {
        throw new Error('No translation in response');
      }

      logger.log('Text translated', {
        from: request.sourceLang,
        to: request.targetLang,
      });

      return {
        originalText: request.text,
        translatedText,
        sourceLang: request.sourceLang,
        targetLang: request.targetLang,
      };
    } catch (error) {
      logger.error('Translation failed', error);
      throw error;
    }
  }

  /**
   * Detect language of text
   */
  public async detectLanguage(text: string): Promise<string> {
    try {
      const params = new URLSearchParams({
        key: this.apiKey,
        q: text,
      });

      const response = await fetch(`${this.apiEndpoint}?${params}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`Language detection error: ${response.statusText}`);
      }

      const data = await response.json();
      const language = data.data?.detections?.[0]?.[0]?.language;

      if (!language) {
        return 'en'; // Default to English
      }

      logger.log('Language detected', { language });
      return language;
    } catch (error) {
      logger.error('Language detection failed', error);
      return 'en'; // Default to English on error
    }
  }
}

export default new TranslationService();
