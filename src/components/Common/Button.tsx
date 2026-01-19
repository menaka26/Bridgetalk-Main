// Button Component - Accessible and Reusable
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  ariaLabel,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-400',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-gray-400',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[52px]',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'cursor-not-allowed opacity-60' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${disabledClass} ${className}`}
      aria-label={ariaLabel}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
