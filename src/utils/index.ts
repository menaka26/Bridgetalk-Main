/**
 * String utility functions
 */

export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDisplayName = (email: string): string => {
  return email.split('@')[0];
};

/**
 * Date utility functions
 */

export const formatTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
};

export const formatTimeHM = (date: Date): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * Validation utility functions
 */

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * DOM and accessibility utility functions
 */

export const announceToScreenReader = (message: string): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

export const setFocusToElement = (selector: string): void => {
  const element = document.querySelector(selector) as HTMLElement;
  if (element) {
    element.focus();
  }
};

export const isReducedMotionEnabled = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Logger utility
 */

export const logger = {
  log: (message: string, data?: any) => {
    console.log(`[BridgeTalk] ${message}`, data || '');
  },
  error: (message: string, error?: any) => {
    console.error(`[BridgeTalk ERROR] ${message}`, error || '');
  },
  warn: (message: string, data?: any) => {
    console.warn(`[BridgeTalk WARNING] ${message}`, data || '');
  },
  debug: (message: string, data?: any) => {
    if (import.meta.env.DEV) {
      console.debug(`[BridgeTalk DEBUG] ${message}`, data || '');
    }
  },
};

/**
 * Local Storage utility
 */

export const storage = {
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      logger.error(`Failed to set storage key: ${key}`, error);
    }
  },
  get: (key: string): any => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      logger.error(`Failed to get storage key: ${key}`, error);
      return null;
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      logger.error(`Failed to remove storage key: ${key}`, error);
    }
  },
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      logger.error('Failed to clear storage', error);
    }
  },
};
