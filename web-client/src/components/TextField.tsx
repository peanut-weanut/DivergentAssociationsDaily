import React from 'react';

interface TextFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const TextField = ({
  value,
  onChange,
  placeholder = "Enter text...",
  className = "w-full border border-gray-300 rounded-md py-2 px-3 font-mono"
}: TextFieldProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default TextField;