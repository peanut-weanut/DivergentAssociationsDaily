import { useState } from 'react';
import TextField from '@/components/TextField';
import SendRequestButton from '@/components/SendRequestButton';
import WordsDisplay from '@/components/WordsDisplay';

interface GameContentProps {
  todaysWords: string[];
  isMobile?: boolean;
  isLoading?: boolean;
}

const GameContent = ({ 
  todaysWords, 
  isMobile = false,
  isLoading = false
}: GameContentProps) => {
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
      <WordsDisplay 
        words={todaysWords.slice(0,3)}
        definitions={todaysWords.slice(3,6)} 
        isLoading={isLoading}
      />
      
      {/* Divider */}
      <hr className="w-full border-t border-black mb-4" />
      
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
      <hr className="w-full border-t border-black my-4" />
      
      {/* Submit button */}
      <SendRequestButton 
        words={[...todaysWords.slice(0,3), ...userInputs.filter(word => word.trim() !== '')]} 
        originalWords={todaysWords.slice(0,3)}
        isMobile={isMobile} 
      />
    </div>
  );
};

export default GameContent;