// Accessibility Context
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { storage } from '@utils/index';
import { ACCESSIBILITY_DEFAULTS } from '@constants/index';
import type { AccessibilityProfile, AccessibilityContext as AccessibilityContextType } from '@types';

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<AccessibilityProfile | null>(() => {
    const savedProfile = storage.get('accessibility_profile');
    return savedProfile || null;
  });

  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (updates: Partial<AccessibilityProfile>) => {
    try {
      setLoading(true);

      // In a real app, this would save to Firebase
      const updatedProfile: AccessibilityProfile = {
        ...profile,
        ...updates,
        updatedAt: new Date(),
      } as AccessibilityProfile;

      setProfile(updatedProfile);
      storage.set('accessibility_profile', updatedProfile);

      // Apply accessibility changes to DOM
      applyAccessibilitySettings(updatedProfile);
    } catch (error) {
      console.error('Failed to update accessibility profile', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleResetToDefaults = async () => {
    try {
      setLoading(true);

      const defaultProfile: AccessibilityProfile = {
        userId: profile?.userId || '',
        ...ACCESSIBILITY_DEFAULTS,
        createdAt: new Date(),
        updatedAt: new Date(),
        voiceSettings: {
          volume: 100,
          rate: 1.0,
          pitch: 1.0,
          language: 'en-US',
          voiceIndex: 0,
        },
      };

      setProfile(defaultProfile);
      storage.set('accessibility_profile', defaultProfile);
      applyAccessibilitySettings(defaultProfile);
    } catch (error) {
      console.error('Failed to reset accessibility settings', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value: AccessibilityContextType = {
    profile,
    loading,
    updateProfile: handleUpdateProfile,
    resetToDefaults: handleResetToDefaults,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

/**
 * Apply accessibility settings to the DOM
 */
function applyAccessibilitySettings(profile: AccessibilityProfile): void {
  const root = document.documentElement;

  // Apply font size
  root.style.fontSize = `${profile.fontSizeValue}px`;

  // Apply dark mode
  if (profile.darkMode) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  // Apply contrast mode
  if (profile.contrastMode === 'high') {
    root.classList.add('high-contrast');
  } else {
    root.classList.remove('high-contrast');
  }

  // Apply reduced motion
  if (profile.reduceMotion) {
    root.classList.add('reduce-motion');
  } else {
    root.classList.remove('reduce-motion');
  }
}

export default AccessibilityContext;
