import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  errorMessage?: string;
  handleChange: (value: string) => void;
  containerStyles?: string;
  inputStyles?: string;
  placeholderStyles?: string;
  rows?: number;
}

export function FormField({
  name,
  type = 'text',
  placeholder,
  value,
  errorMessage,
  handleChange,
  containerStyles = '',
  inputStyles = '',
  placeholderStyles = 'text-gray-500',
  rows = 4,
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const isTextArea = type === 'textarea';

  // Determine the input type based on password toggle state
  const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`space-y-2 ${errorMessage ? 'mb-4' : ''} ${containerStyles}`}>
      {isTextArea ? (
        <textarea
          name={name}
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          className={`w-full border-2 border-gray-300 rounded-lg p-3 outline-none bg-transparent resize-none ${inputStyles} ${placeholderStyles}`}
        />
      ) : (
        <div className={`w-full border-2 border-gray-300 rounded-lg flex items-center ${inputStyles}`}>  
          <input
            name={name}
            type={inputType}
            value={value}
            placeholder={placeholder}
            onChange={(e) => handleChange(e.target.value)}
            className={`flex-1 p-3 outline-none bg-transparent ${placeholderStyles}`}
          />
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
      )}
      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}
    </div>
  );
}
