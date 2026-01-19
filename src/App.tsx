// Main App Component
import React from 'react';
import { AccessibilityProvider } from '@context/AccessibilityContext';
import Chat from '@pages/Chat';
import '@styles/globals.css';
import '@styles/accessibility.css';

const App: React.FC = () => {
  return (
    <AccessibilityProvider>
      <Chat />
    </AccessibilityProvider>
  );
};

export default App;
