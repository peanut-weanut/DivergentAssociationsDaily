import { useState } from 'react';
import TextField from '@/components/TextField';
import SendRequestButton from '@/components/SendRequestButton';

interface GameContentProps {
  todaysWords: string[];
  isMobile?: boolean;
}

const GameContent = ({ todaysWords, isMobile = false }: GameContentProps) => {
  // User input words
  const [userInputs, setUserInputs] = useState<string[]>(Array(5).fill(''));
  
  // Update a specific input field
  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...userInputs];
    newInputs[index] = value;
    setUserInputs(newInputs);
  };

  return (
    <div className={`flex flex-col items-center ${isMobile ? "pb-16" : ""}`}>
      {/* Words of the day */}
      <div className="border border-black w-full mb-4">
        <div className="text-center py-2">Your words are:</div>
        {todaysWords.map((word, index) => (
          <div key={index} className="text-center text-3xl uppercase my-2 font-mono">
            {word}
          </div>
        ))}
      </div>
      
      {/* Divider */}
      <hr className="w-full border-t border-gray-300 mb-4" />
      
      {/* Input fields */}
      <div className="w-full space-y-3">
        {Array(5).fill(0).map((_, index) => (
          <TextField
            key={index}
            value={userInputs[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      
      {/* Divider */}
      <hr className="w-full border-t border-gray-300 my-4" />
      
      {/* Submit button */}
      <SendRequestButton 
        words={[...todaysWords, ...userInputs.filter(word => word.trim() !== '')]} 
        isMobile={isMobile} 
      />
    </div>
  );
};

export default GameContent;