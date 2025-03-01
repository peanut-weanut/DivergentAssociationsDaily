import { useState } from 'react';

const TextField = () => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Enter text..."
      className="h-6 bg-gray-100"
    />
  );
};

export default TextField;
