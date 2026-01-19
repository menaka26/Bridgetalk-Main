// Message Input Component with Voice Support
import React, { useState } from 'react';
import Button from '@components/Common/Button';
import { useSpeechToText } from '@hooks/index';
import { announceToScreenReader } from '@utils/index';

interface MessageInputProps {
  onSendMessage: (text: string) => Promise<void>;
  disabled?: boolean;
  placeholder?: string;
  onVoiceStart?: () => void;
  onVoiceEnd?: () => void;
  aiEnabled?: boolean;
  onAIAction?: (action: string, text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = 'Type your message...',
  onVoiceStart,
  onVoiceEnd,
  aiEnabled = false,
  onAIAction,
}) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { transcript, isListening, startListening, stopListening, resetTranscript } =
    useSpeechToText();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      setIsSending(true);
      await onSendMessage(message.trim());
      setMessage('');
      announceToScreenReader('Message sent successfully');
    } catch (error) {
      announceToScreenReader('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
      onVoiceEnd?.();
      if (transcript) {
        setMessage((prev) => prev + (prev ? ' ' : '') + transcript);
      }
    } else {
      resetTranscript();
      startListening();
      onVoiceStart?.();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAISimplify = () => {
    if (message.trim() && onAIAction) {
      onAIAction('simplify', message);
    }
  };

  return (
    <div className='p-4 border-t border-gray-200 bg-white rounded-b-lg'>
      <div className='space-y-2'>
        {/* Message Display for Voice Input */}
        {(message || transcript) && (
          <div className='bg-gray-100 rounded-lg p-3 text-base'>
            <span>{message}</span>
            {transcript && <span className='text-gray-500 italic'> {transcript}</span>}
          </div>
        )}

        {/* Input Area */}
        <div className='flex gap-2 items-end'>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isSending || isListening}
            className='flex-1 p-3 text-base border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 disabled:bg-gray-100 min-h-[44px] max-h-32'
            aria-label='Message input'
            role='textbox'
            aria-multiline='true'
          />

          <div className='flex gap-2 flex-wrap justify-end'>
            {/* Voice Input Button */}
            <Button
              variant={isListening ? 'danger' : 'secondary'}
              size='md'
              onClick={handleVoiceInput}
              disabled={disabled || isSending}
              aria-label={isListening ? 'Stop voice input' : 'Start voice input (double-tap)'}
              title='Double-tap to activate voice mode'
            >
              {isListening ? '⏹️ Stop' : '🎤'}
            </Button>

            {/* AI Action Button */}
            {aiEnabled && (
              <Button
                variant='secondary'
                size='md'
                onClick={handleAISimplify}
                disabled={!message.trim() || disabled || isSending}
                aria-label='AI actions: simplify text'
                title='Use AI to simplify message'
              >
                ✨ AI
              </Button>
            )}

            {/* Send Button */}
            <Button
              variant='primary'
              size='md'
              onClick={handleSendMessage}
              disabled={!message.trim() || disabled || isSending}
              aria-label='Send message'
            >
              {isSending ? '⏳' : '➤ Send'}
            </Button>
          </div>
        </div>

        {/* Hints */}
        <p className='text-xs text-gray-600'>
          <span className='sr-only'>Keyboard shortcut:</span> Press <kbd>Enter</kbd> to send,{' '}
          <kbd>Shift+Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
};

export default MessageInput;
