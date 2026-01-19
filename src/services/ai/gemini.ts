// Google Gemini AI Service
import { API_KEYS } from '@constants/index';
import { logger } from '@utils/index';
import type { EmotionAnalysis } from '@types';

interface GeminiRequest {
  contents: Array<{
    role: 'user' | 'model';
    parts: Array<{ text: string }>;
  }>;
}

class GeminiAIService {
  private apiKey: string;
  private apiEndpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  constructor() {
    this.apiKey = API_KEYS.GOOGLE_GEMINI_API_KEY;

    if (!this.apiKey) {
      logger.warn('Google Gemini API key not configured');
    }
  }

  private async makeRequest(prompt: string): Promise<string> {
    try {
      const requestBody: GeminiRequest = {
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      };

      const response = await fetch(`${this.apiEndpoint}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error('No response from API');
      }

      return text;
    } catch (error) {
      logger.error('Gemini API request failed', error);
      throw error;
    }
  }

  /**
   * Simplify text to easy-to-understand language
   */
  public async simplifyText(text: string): Promise<string> {
    const prompt = `Simplify the following text into easy-to-understand language suitable for all readers, especially those with reading difficulties. Keep the meaning the same but use simpler words and shorter sentences:\n\n${text}`;

    try {
      const simplified = await this.makeRequest(prompt);
      logger.log('Text simplified successfully');
      return simplified;
    } catch (error) {
      logger.error('Failed to simplify text', error);
      throw error;
    }
  }

  /**
   * Detect emotion in text
   */
  public async detectEmotion(text: string): Promise<EmotionAnalysis> {
    const prompt = `Analyze the emotional tone of the following text and respond ONLY with JSON in this exact format: {"emotion":"happy|sad|angry|neutral|confused|excited","confidence":0.0-1.0,"sentiment":"positive|negative|neutral"}. Text: "${text}"`;

    try {
      const response = await this.makeRequest(prompt);
      const analysis = JSON.parse(response);
      logger.log('Emotion detected');
      return analysis as EmotionAnalysis;
    } catch (error) {
      logger.error('Failed to detect emotion', error);
      return {
        emotion: 'neutral',
        confidence: 0,
        sentiment: 'neutral',
      };
    }
  }

  /**
   * Auto-summarize long text
   */
  public async summarizeText(text: string, maxLength: number = 100): Promise<string> {
    const prompt = `Summarize the following text in ${maxLength} characters or less, keeping the most important information:\n\n${text}`;

    try {
      const summary = await this.makeRequest(prompt);
      logger.log('Text summarized');
      return summary;
    } catch (error) {
      logger.error('Failed to summarize text', error);
      throw error;
    }
  }

  /**
   * Get AI-powered message suggestions
   */
  public async getSuggestions(conversationContext: string): Promise<string[]> {
    const prompt = `Based on the following conversation context, suggest 3 short and helpful responses. Return only a JSON array of strings with 3 suggestions, nothing else:\n\n${conversationContext}`;

    try {
      const response = await this.makeRequest(prompt);
      const suggestions = JSON.parse(response);
      logger.log('Suggestions generated');
      return Array.isArray(suggestions) ? suggestions : [];
    } catch (error) {
      logger.error('Failed to get suggestions', error);
      return [];
    }
  }

  /**
   * Generate an accessible description of content
   */
  public async generateAccessibleDescription(content: string): Promise<string> {
    const prompt = `Generate a clear, concise, and accessible description of the following content that would be helpful when read aloud by a screen reader:\n\n${content}`;

    try {
      const description = await this.makeRequest(prompt);
      logger.log('Accessible description generated');
      return description;
    } catch (error) {
      logger.error('Failed to generate accessible description', error);
      throw error;
    }
  }
}

export default new GeminiAIService();
