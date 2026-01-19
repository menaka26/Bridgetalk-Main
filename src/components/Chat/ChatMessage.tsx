// Chat Message Component
import React from 'react';
import { formatTimeHM } from '@utils/index';

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    timestamp: Date;
    detectedEmotion?: string;
    simplifiedText?: string;
    isRead?: boolean;
  };
  isOwn: boolean;
  onSpeakMessage?: (text: string) => void;
  onSimplifyMessage?: (messageId: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isOwn,
  onSpeakMessage,
  onSimplifyMessage,
}) => {
  const messageClass = isOwn ? 'justify-end' : 'justify-start';
  const bubbleClass = isOwn
    ? 'bg-blue-500 text-white rounded-bl-2xl rounded-tl-2xl rounded-tr-lg'
    : 'bg-gray-200 text-gray-900 rounded-br-2xl rounded-tr-2xl rounded-tl-lg';

  return (
    <div className={`flex ${messageClass} mb-3 group`}>
      <div className={`max-w-xs px-4 py-2 ${bubbleClass}`}>
        {message.detectedEmotion && (
          <div
            className='text-xs opacity-75 mb-1'
            aria-label={`Detected emotion: ${message.detectedEmotion}`}
          >
            {message.detectedEmotion}
          </div>
        )}

        {message.simplifiedText && (
          <div className='text-sm mb-2 opacity-90'>
            <strong>Simplified:</strong> {message.simplifiedText}
          </div>
        )}

        <p className='text-base break-words'>{message.text}</p>

        <div className='text-xs opacity-75 mt-1 flex justify-between items-center gap-2'>
          <time dateTime={message.timestamp.toISOString()}>
            {formatTimeHM(message.timestamp)}
          </time>
          {message.isRead && !isOwn && (
            <span aria-label='Message read'>✓✓</span>
          )}
        </div>

        <div className='flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity'>
          {onSpeakMessage && (
            <button
              onClick={() => onSpeakMessage(message.text)}
              className='text-xs px-2 py-1 bg-opacity-30 hover:bg-opacity-50 rounded transition-colors'
              aria-label={`Read message aloud: ${message.text.substring(0, 20)}`}
              title='Read message aloud'
            >
              🔊
            </button>
          )}

          {onSimplifyMessage && !message.simplifiedText && (
            <button
              onClick={() => onSimplifyMessage(message.id)}
              className='text-xs px-2 py-1 bg-opacity-30 hover:bg-opacity-50 rounded transition-colors'
              aria-label='Simplify message'
              title='Simplify message'
            >
              ✨
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
