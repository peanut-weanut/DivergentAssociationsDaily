import { useState } from 'react';
import TextField from '@/components/TextField';
import { sendWords } from '@/lib/api-client';

interface GameContentProps {
  todaysWords: string[];
  isMobile?: boolean;
}

const GameContent = ({ todaysWords, isMobile = false }: GameContentProps) => {
  // User input words
  const [userInputs, setUserInputs] = useState<string[]>(Array(5).fill(''));
  
  // Form submission state
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [response, setResponse] = useState<string>('');

  // Update a specific input field
  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...userInputs];
    newInputs[index] = value;
    setUserInputs(newInputs);
  };

  // Submit all words to the API
  const handleSubmit = async () => {
    setStatus('loading');
    
    try {
      // Combine today's words with user inputs
      const allWords = [...todaysWords, ...userInputs.filter(word => word.trim() !== '')];
      const result = await sendWords.sendData(allWords);
      
      setResponse(result);
      setStatus('success');
    } catch (error) {
      console.error(`ERROR: ${error}`);
      setStatus('error');
    }
    
    setTimeout(() => setStatus('idle'), 2000);
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
      
      {/* Submit button - absolute positioning for mobile */}
      <div className={`w-full flex items-center ${isMobile ? "fixed bottom-2 left-0 px-4 max-w-sm mx-auto right-0" : ""}`}>
        <button
          onClick={handleSubmit}
          disabled={status === 'loading'}
          className="flex-1 border border-black py-3 text-xl font-mono uppercase"
        >
          Submit
        </button>
        
        {isMobile && (
          <button
            onClick={() => window.openHelpModal?.()}
            className="ml-2 w-12 h-12 rounded-full border border-black flex items-center justify-center text-2xl"
          >
            ?
          </button>
        )}
      </div>
      
      {/* Response message */}
      {response && (
        <div className="w-full mt-2 text-sm font-mono">
          Response: {response}
        </div>
      )}
    </div>
  );
};

export default GameContent;