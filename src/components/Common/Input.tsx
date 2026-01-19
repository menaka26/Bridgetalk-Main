// Input Component - Accessible form input
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random()}`;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  const ariaDescribedBy = [error ? errorId : '', hint ? hintId : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={inputId} className='block text-base font-medium text-gray-700 mb-2'>
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={`w-full px-4 py-2 text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : ''
        } ${className}`}
        aria-describedby={ariaDescribedBy || undefined}
        aria-invalid={!!error}
        {...props}
      />

      {hint && (
        <p id={hintId} className='mt-1 text-sm text-gray-600'>
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className='mt-1 text-sm text-red-600' role='alert'>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
