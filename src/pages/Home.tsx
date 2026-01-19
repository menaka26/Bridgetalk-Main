// Home Page Component
import React, { useState } from 'react';
import { useAuth } from '@context/AuthContext';
import Button from '@components/Common/Button';
import Input from '@components/Common/Input';
import { isValidEmail, isValidPassword, logger, announceToScreenReader } from '@utils/index';
import './Home.css';

const Home: React.FC = () => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!isValidPassword(password)) {
      newErrors.password =
        'Password must be at least 8 characters with uppercase, lowercase, and numbers';
    }

    if (!isLogin && !displayName.trim()) {
      newErrors.displayName = 'Please enter your name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      announceToScreenReader('Form has validation errors');
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});

      if (isLogin) {
        await login(email, password);
        announceToScreenReader('Login successful');
      } else {
        await register(email, password, displayName);
        announceToScreenReader('Registration successful');
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Authentication failed';
      announceToScreenReader(errorMessage);
      setErrors({ submit: errorMessage });
      logger.error('Authentication error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setEmail('');
    setPassword('');
    setDisplayName('');
  };

  return (
    <div className='home-container'>
      <div className='home-content'>
        {/* Header */}
        <header className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-blue-600 mb-2'>BridgeTalk</h1>
          <p className='text-xl text-gray-700'>
            Inclusive, accessible real-time chat powered by AI
          </p>
          <p className='text-sm text-gray-600 mt-2'>
            Designed with accessibility as our core priority
          </p>
        </header>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className='home-form'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          {/* Email Input */}
          <Input
            type='email'
            label='Email Address'
            placeholder='your@email.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            fullWidth
          />

          {/* Display Name (Register only) */}
          {!isLogin && (
            <Input
              type='text'
              label='Display Name'
              placeholder='Your name'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              error={errors.displayName}
              fullWidth
            />
          )}

          {/* Password Input */}
          <Input
            type='password'
            label='Password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            hint={
              !isLogin
                ? 'At least 8 characters, 1 uppercase, 1 lowercase, 1 number'
                : undefined
            }
            fullWidth
          />

          {/* Submit Error */}
          {errors.submit && (
            <div className='p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg' role='alert'>
              {errors.submit}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type='submit'
            variant='primary'
            size='lg'
            fullWidth
            disabled={isLoading}
            aria-label={isLogin ? 'Sign in' : 'Create account'}
          >
            {isLoading ? '⏳ Loading...' : isLogin ? 'Sign In' : 'Create Account'}
          </Button>

          {/* Toggle Mode */}
          <div className='text-center mt-4'>
            <p className='text-gray-700'>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type='button'
                onClick={toggleMode}
                className='text-blue-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1'
              >
                {isLogin ? 'Register' : 'Sign In'}
              </button>
            </p>
          </div>
        </form>

        {/* Features Section */}
        <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto'>
          <div className='feature-card'>
            <h3 className='text-lg font-semibold mb-2'>🎤 Voice Enabled</h3>
            <p className='text-sm text-gray-600'>
              Speak and have your voice converted to text automatically
            </p>
          </div>

          <div className='feature-card'>
            <h3 className='text-lg font-semibold mb-2'>✨ AI Powered</h3>
            <p className='text-sm text-gray-600'>
              Messages simplified, emotions detected, and more with Gemini AI
            </p>
          </div>

          <div className='feature-card'>
            <h3 className='text-lg font-semibold mb-2'>♿ Accessible</h3>
            <p className='text-sm text-gray-600'>
              WCAG AAA compliant with screen reader support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
