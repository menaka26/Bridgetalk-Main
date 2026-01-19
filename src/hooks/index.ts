// Custom React Hooks
import { useState, useCallback, useEffect } from 'react';
import { subscribeToMessages, sendMessage } from '@services/firebase/firebase';
import speechToTextService from '@services/speech/speechToText';
import textToSpeechService from '@services/speech/textToSpeech';
import { logger } from '@utils/index';
import type { Message } from '@types';

/**
 * Hook for managing chat messages
 */
export const useChat = (userId: string, otherUserId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId || !otherUserId) return;

    setLoading(true);
    const unsubscribe = subscribeToMessages(userId, otherUserId, (updatedMessages) => {
      setMessages(updatedMessages);
      setLoading(false);
    });

    return unsubscribe;
  }, [userId, otherUserId]);

  const sendChatMessage = useCallback(
    async (text: string, additionalData?: any) => {
      try {
        setError(null);
        await sendMessage(userId, otherUserId, text, additionalData);
        logger.log('Message sent successfully');
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to send message';
        setError(errorMessage);
        logger.error('Failed to send message', err);
        throw err;
      }
    },
    [userId, otherUserId]
  );

  return {
    messages,
    loading,
    error,
    sendMessage: sendChatMessage,
  };
};

/**
 * Hook for speech-to-text functionality
 */
export const useSpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported] = useState(speechToTextService.isSupported());

  const startListening = useCallback((language?: string) => {
    if (!isSupported) {
      setError('Speech recognition not supported');
      return;
    }

    setIsListening(true);
    setTranscript('');
    setError(null);

    speechToTextService.start(
      (text, isFinal) => {
        if (isFinal) {
          setTranscript((prev) => prev + text);
          setInterimTranscript('');
        } else {
          setInterimTranscript(text);
        }
      },
      {
        language,
        onError: (err) => {
          setError(err.message || 'Speech recognition error');
          setIsListening(false);
        },
        onEnd: () => {
          setIsListening(false);
        },
      }
    );
  }, [isSupported]);

  const stopListening = useCallback(() => {
    speechToTextService.stop();
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setError(null);
  }, []);

  return {
    transcript,
    interimTranscript,
    isListening,
    isSupported,
    error,
    startListening,
    stopListening,
    resetTranscript,
  };
};

/**
 * Hook for text-to-speech functionality
 */
export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported] = useState(textToSpeechService.isSupported());

  const speak = useCallback(
    (text: string, options?: any) => {
      if (!isSupported) {
        setError('Text-to-speech not supported');
        return;
      }

      setError(null);
      setIsSpeaking(true);

      try {
        textToSpeechService.speak(text, options, () => {
          setIsSpeaking(false);
        });
      } catch (err: any) {
        setError(err.message || 'Text-to-speech error');
        setIsSpeaking(false);
      }
    },
    [isSupported]
  );

  const stop = useCallback(() => {
    textToSpeechService.stop();
    setIsSpeaking(false);
  }, []);

  const pause = useCallback(() => {
    textToSpeechService.pause();
  }, []);

  const resume = useCallback(() => {
    textToSpeechService.resume();
  }, []);

  return {
    isSpeaking,
    isSupported,
    error,
    speak,
    stop,
    pause,
    resume,
  };
};

/**
 * Hook for form validation
 */
export const useFormValidation = (initialValues: Record<string, any>, onSubmit: (values: any) => Promise<void>) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(values);
    } catch (error) {
      logger.error('Form submission error', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const setFieldError = (field: string, error: string) => {
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldError,
  };
};

/**
 * Hook for managing debounced values
 */
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
