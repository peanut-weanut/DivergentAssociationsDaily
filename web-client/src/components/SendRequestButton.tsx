import { useState } from "react";
import { sendWords } from '@/lib/api-client';
import ScoreScreen from './ScoreScreen';

interface RequestProps {
  words: string[];
  isMobile?: boolean;
  originalWords: string[]; // Added to track original daily words
}

const SendRequestButton: React.FC<RequestProps> = ({ 
  words, 
  originalWords, 
  isMobile = false 
}) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [scoreData, setScoreData] = useState<{ score: number } | null>(null);
  const [userWords, setUserWords] = useState<string[]>([]);

  const handleSubmit = async () => {
    // Extract user words (excluding original words)
    const userInputWords = words.slice(originalWords.length);
    
    // Skip submission if no user words
    if (userInputWords.filter(w => w.trim()).length === 0) {
      return;
    }
    
    setUserWords(userInputWords);
    setStatus('loading');
    
    try {
      const result = await sendWords.sendData(words);
      
      // Parse the response - assuming it returns a score
      // Adjust this based on your actual API response format
      let parsedResult;
      try {
        parsedResult = JSON.parse(result);
      } catch (e) {
        // Fallback if not valid JSON
        parsedResult = { score: parseInt(result) || 0 };
      }
      
      setScoreData(parsedResult);
      setStatus('success');
    } catch (error) {
      console.error(`ERROR: ${error}`);
      setStatus('error');
    }
  };

  return (
    <>
      {/* Loading overlay */}
      {status === 'loading' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <div className="text-xl mb-4">Calculating your score...</div>
            <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}
      
      {/* Submit button */}
      <div className={`w-full flex items-center ${isMobile ? "fixed bottom-2 left-0 px-4 max-w-sm mx-auto right-0" : ""}`}>
        <button
          onClick={handleSubmit}
          disabled={status === 'loading'}
          className="flex-1 border border-black py-3 text-xl font-mono uppercase hover:bg-black hover:text-white transition-colors duration-200"
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
      
      {/* Score screen - only rendered when we have score data */}
      {scoreData && (
        <ScoreScreen 
          score={scoreData.score} 
          words={originalWords}
          userWords={userWords}
          autoScroll={true}
        />
      )}
    </>
  );
};

export default SendRequestButton;