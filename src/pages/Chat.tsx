// Premium Voice Assistant - Google Assistant Style UI
import React, { useEffect, useState, useRef } from 'react';
import { useSpeechToText, useTextToSpeech } from '@hooks/index';
import { logger } from '@utils/index';

import { sendMessage } from '../services/chatService';


interface Message {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const transcriptRef = useRef("");

  // Voice features
  const { transcript, isListening, startListening, stopListening, resetTranscript } = useSpeechToText();
  const { speak } = useTextToSpeech();
  useEffect(() => {
  transcriptRef.current = transcript;
  console.log("Transcript:", transcript);
}, [transcript]);
  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Process voice when listening stops
 ;

  const processVoiceCommand = async (command: string) => {
    if (!command.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        type: 'user',
        text: command,
        timestamp: new Date(),
      },
    ]);

    setIsProcessing(true);

try {
  console.log("➡️ sending to backend:", command);

  const response = await sendMessage(command);

  console.log("⬅️ backend reply:", response);

  setMessages((prev) => [
    ...prev,
    {
      id: `assistant-${Date.now()}`,
      type: 'assistant',
      text: response,
      timestamp: new Date(),
    },
  ]);

      // Speak response
      speak(response);
    } catch (error) {
      logger.error('Error', error);
    } finally {
      setIsProcessing(false);
      resetTranscript();
    }
  };

 
 const toggleMic = () => {
  if (isListening) {
    stopListening();

    setTimeout(() => {
      const finalText = transcriptRef.current.trim();

      if (finalText) {
        processVoiceCommand(finalText);
      } else {
        console.log("No voice text detected");
      }
    }, 800);
  } else {
    resetTranscript();
    transcriptRef.current = "";
    startListening();
  }
};

  const clearChat = () => {
    setMessages([]);
    resetTranscript();
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        darkMode
          ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}
    >
      {/* Header */}
      <header
        className={`${
          darkMode
            ? 'bg-slate-800 bg-opacity-50 border-slate-700'
            : 'bg-white bg-opacity-70 border-gray-200'
        } border-b backdrop-blur-xl px-6 py-4`}
      >
        <div className='flex justify-between items-center max-w-7xl mx-auto'>
          <div>
            <h1
              className={`text-3xl font-black ${
                darkMode ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400' : 'text-purple-600'
              }`}
            >
              🎤 BridgeTalk
            </h1>
            <p
              className={`text-sm ${
                darkMode ? 'text-slate-400' : 'text-gray-600'
              }`}
            >
              AI Voice Assistant
            </p>
          </div>

          <div className='flex gap-2'>
            <button
              onClick={clearChat}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                darkMode
                  ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🗑️ Clear
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                darkMode
                  ? 'bg-yellow-900 text-yellow-200 hover:bg-yellow-800'
                  : 'bg-blue-200 text-blue-700 hover:bg-blue-300'
              }`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 overflow-y-auto'>
        {messages.length === 0 ? (
          <div className='h-full flex flex-col items-center justify-center text-center px-6'>
            {/* Animated Circle */}
            <div className='mb-8'>
              <div
                className={`w-32 h-32 rounded-full ${
                  darkMode
                    ? 'bg-gradient-to-br from-purple-500 to-blue-500'
                    : 'bg-gradient-to-br from-purple-400 to-blue-400'
                } shadow-2xl flex items-center justify-center`}
              >
                <span className='text-6xl'>🎙️</span>
              </div>
            </div>

            <h2
              className={`text-3xl font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              How can I help?
            </h2>

            <p
              className={`text-lg mb-8 max-w-xl ${
                darkMode ? 'text-slate-300' : 'text-gray-600'
              }`}
            >
              Click the microphone below or try saying "What's the weather?" or "What time is it?"
            </p>

            {/* Quick Commands */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-8'>
              {[
                { emoji: '🌤️', text: 'Weather' },
                { emoji: '⏰', text: 'Time' },
                { emoji: '📅', text: 'Date' },
                { emoji: '💬', text: 'Chat' },
              ].map((cmd, i) => (
                <button
                  key={i}
                  onClick={() => processVoiceCommand(cmd.text)}
                  className={`p-4 rounded-xl transition transform hover:scale-105 ${
                    darkMode
                      ? 'bg-slate-700 hover:bg-slate-600 text-slate-200'
                      : 'bg-white hover:bg-gray-100 text-gray-700'
                  } shadow-lg`}
                >
                  <div className='text-2xl mb-1'>{cmd.emoji}</div>
                  <div className='text-sm font-medium'>{cmd.text}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className='max-w-3xl mx-auto px-6 py-8 space-y-6'>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.type === 'user' ? 'justify-end' : 'justify-start'
                } animate-fade-in`}
              >
                <div
                  className={`max-w-xl px-6 py-4 rounded-2xl shadow-lg ${
                    msg.type === 'user'
                      ? darkMode
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : darkMode
                      ? 'bg-slate-700 text-slate-100'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <p className='text-base leading-relaxed'>{msg.text}</p>

                 <button
                 onClick={() => speak(msg.text)}
                  className="mt-2 text-xs underline opacity-70 hover:opacity-100"
>
                      🔊 Read
                  </button>
                  <p
                    className={`text-xs mt-2 ${
                      msg.type === 'user'
                        ? 'text-blue-100'
                        : darkMode
                        ? 'text-slate-400'
                        : 'text-gray-500'
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isProcessing && (
              <div className='flex justify-start'>
                <div
                  className={`px-6 py-4 rounded-2xl ${
                    darkMode ? 'bg-slate-700' : 'bg-gray-200'
                  }`}
                >
                  <div className='flex space-x-2'>
                    <div
                      className={`w-3 h-3 rounded-full animate-bounce ${
                        darkMode ? 'bg-purple-400' : 'bg-purple-600'
                      }`}
                    ></div>
                    <div
                      className={`w-3 h-3 rounded-full animate-bounce delay-100 ${
                        darkMode ? 'bg-purple-400' : 'bg-purple-600'
                      }`}
                    ></div>
                    <div
                      className={`w-3 h-3 rounded-full animate-bounce delay-200 ${
                        darkMode ? 'bg-purple-400' : 'bg-purple-600'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Voice Input Section */}
      <footer
        className={`${
          darkMode
            ? 'bg-slate-800 bg-opacity-50 border-slate-700'
            : 'bg-white bg-opacity-70 border-gray-200'
        } border-t backdrop-blur-xl px-6 py-6`}
      >
        <div className='max-w-3xl mx-auto'>
          {/* Transcript Display */}
          {transcript && (
            <div
              className={`mb-4 p-4 rounded-lg ${
                darkMode ? 'bg-slate-700 text-slate-200' : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className='text-xs font-semibold opacity-70 mb-1'>Listening:</p>
              <p className='text-base'>{transcript}</p>
            </div>
          )}

          {/* Microphone Button */}
          <div className='flex justify-center'>
            <button
              onClick={toggleMic}
              disabled={isProcessing}
              className={`w-24 h-24 rounded-full shadow-2xl transition-all transform ${
                isListening
                  ? 'bg-red-500 scale-110 animate-pulse'
                  : isProcessing
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-purple-500/50 hover:scale-105 active:scale-95'
              }`}
              aria-label='Toggle voice input'
              title={isListening ? 'Listening...' : 'Click to speak'}
            >
              <span className='text-5xl'>
                {isListening ? '🎙️' : isProcessing ? '⏳' : '🎤'}
              </span>
            </button>
          </div>

          {/* Status */}
          <p
            className={`text-center mt-4 text-sm font-medium ${
              darkMode ? 'text-slate-300' : 'text-gray-600'
            }`}
          >
            {isListening ? (
              <span className='text-red-500 animate-pulse'>🔴 Listening...</span>
            ) : isProcessing ? (
              <span className='text-blue-500 animate-pulse'>⏳ Processing...</span>
            ) : (
              'Click the microphone to speak'
            )}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ChatPage;
