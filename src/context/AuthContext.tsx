// Authentication Context
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  registerUser,
  loginUser,
  logoutUser,
  onAuthStateChange,
  getUserById,
} from '@services/firebase/firebase';
import { logger } from '@utils/index';
import type { User, AuthContext as AuthContextType } from '@types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser: FirebaseUser | null) => {
      try {
        if (firebaseUser) {
          const user = await getUserById(firebaseUser.uid);
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      } catch (err) {
        logger.error('Error fetching user data', err);
        setError('Failed to load user data');
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      setError(null);
      setLoading(true);
      await loginUser(email, password);
      logger.log('Login successful');
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      logger.error('Login error', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setError(null);
      await logoutUser();
      setCurrentUser(null);
      logger.log('Logout successful');
    } catch (err: any) {
      const errorMessage = err.message || 'Logout failed';
      setError(errorMessage);
      logger.error('Logout error', err);
      throw err;
    }
  };

  const handleRegister = async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      setLoading(true);
      const user = await registerUser(email, password, displayName);
      setCurrentUser(user);
      logger.log('Registration successful');
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed';
      setError(errorMessage);
      logger.error('Registration error', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
