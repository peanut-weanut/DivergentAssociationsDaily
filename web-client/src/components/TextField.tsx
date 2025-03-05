import React, { ChangeEvent } from 'react';

interface TextFieldProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Enter text..."
      className="h-6 bg-gray-100"
    />
  );
};

export default TextField;