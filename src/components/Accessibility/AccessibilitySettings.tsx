// Accessibility Settings Component
import React from 'react';
import { useAccessibility } from '@context/AccessibilityContext';
import Button from '@components/Common/Button';
import { announceToScreenReader } from '@utils/index';

const AccessibilitySettings: React.FC = () => {
  const { profile, updateProfile, resetToDefaults } = useAccessibility();

  if (!profile) return null;

  const handleFontSizeChange = async (size: 'small' | 'medium' | 'large' | 'extra-large') => {
    const sizeMap = { small: 12, medium: 16, large: 20, 'extra-large': 24 };
    await updateProfile({ fontSize: size, fontSizeValue: sizeMap[size] });
    announceToScreenReader(`Font size changed to ${size}`);
  };

  const handleContrastToggle = async () => {
    const newMode = profile.contrastMode === 'normal' ? 'high' : 'normal';
    await updateProfile({ contrastMode: newMode });
    announceToScreenReader(`Contrast mode changed to ${newMode}`);
  };

  const handleDarkModeToggle = async () => {
    await updateProfile({ darkMode: !profile.darkMode });
    announceToScreenReader(`Dark mode ${!profile.darkMode ? 'enabled' : 'disabled'}`);
  };

  const handleTextToSpeechToggle = async () => {
    await updateProfile({ textToSpeechEnabled: !profile.textToSpeechEnabled });
    announceToScreenReader(
      `Text to speech ${!profile.textToSpeechEnabled ? 'enabled' : 'disabled'}`
    );
  };

  const handleSpeechToTextToggle = async () => {
    await updateProfile({ speechToTextEnabled: !profile.speechToTextEnabled });
    announceToScreenReader(
      `Speech to text ${!profile.speechToTextEnabled ? 'enabled' : 'disabled'}`
    );
  };

  const handleAutoReadToggle = async () => {
    await updateProfile({ autoReadMessages: !profile.autoReadMessages });
    announceToScreenReader(
      `Auto read messages ${!profile.autoReadMessages ? 'enabled' : 'disabled'}`
    );
  };

  return (
    <div
      className='space-y-6 p-4 bg-white rounded-lg border border-gray-200'
      role='region'
      aria-label='Accessibility Settings'
    >
      <h2 className='text-xl font-bold text-gray-900'>Accessibility Settings</h2>

      {/* Font Size */}
      <fieldset className='space-y-2'>
        <legend className='font-semibold text-gray-900 text-base'>Font Size</legend>
        <div className='flex flex-wrap gap-2'>
          {(['small', 'medium', 'large', 'extra-large'] as const).map((size) => (
            <Button
              key={size}
              variant={profile.fontSize === size ? 'primary' : 'secondary'}
              size='sm'
              onClick={() => handleFontSizeChange(size)}
              aria-pressed={profile.fontSize === size}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </Button>
          ))}
        </div>
      </fieldset>

      {/* Contrast Mode */}
      <div>
        <label className='flex items-center gap-3 cursor-pointer'>
          <input
            type='checkbox'
            checked={profile.contrastMode === 'high'}
            onChange={handleContrastToggle}
            className='w-5 h-5 cursor-pointer'
            aria-label='High contrast mode'
          />
          <span className='text-base text-gray-900'>High Contrast Mode</span>
        </label>
      </div>

      {/* Dark Mode */}
      <div>
        <label className='flex items-center gap-3 cursor-pointer'>
          <input
            type='checkbox'
            checked={profile.darkMode}
            onChange={handleDarkModeToggle}
            className='w-5 h-5 cursor-pointer'
            aria-label='Dark mode'
          />
          <span className='text-base text-gray-900'>Dark Mode</span>
        </label>
      </div>

      {/* Text-to-Speech */}
      <div>
        <label className='flex items-center gap-3 cursor-pointer'>
          <input
            type='checkbox'
            checked={profile.textToSpeechEnabled}
            onChange={handleTextToSpeechToggle}
            className='w-5 h-5 cursor-pointer'
            aria-label='Enable text to speech'
          />
          <span className='text-base text-gray-900'>Text-to-Speech</span>
        </label>
      </div>

      {/* Speech-to-Text */}
      <div>
        <label className='flex items-center gap-3 cursor-pointer'>
          <input
            type='checkbox'
            checked={profile.speechToTextEnabled}
            onChange={handleSpeechToTextToggle}
            className='w-5 h-5 cursor-pointer'
            aria-label='Enable speech to text'
          />
          <span className='text-base text-gray-900'>Speech-to-Text</span>
        </label>
      </div>

      {/* Auto-Read Messages */}
      <div>
        <label className='flex items-center gap-3 cursor-pointer'>
          <input
            type='checkbox'
            checked={profile.autoReadMessages}
            onChange={handleAutoReadToggle}
            className='w-5 h-5 cursor-pointer'
            aria-label='Auto read incoming messages'
          />
          <span className='text-base text-gray-900'>Auto-Read Messages</span>
        </label>
      </div>

      {/* Reset Button */}
      <Button
        variant='secondary'
        fullWidth
        onClick={resetToDefaults}
        aria-label='Reset to default accessibility settings'
      >
        Reset to Defaults
      </Button>
    </div>
  );
};

export default AccessibilitySettings;
