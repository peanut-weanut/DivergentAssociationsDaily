import { useState } from "react";
import { finalSubmit } from '@/lib/api-client';
import ScoreScreen from './ScoreScreen';
import Modal from '@/components/Modal';

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
  const [scoreData, setScoreData] = useState<number | null>(null);
  const [userWords, setUserWords] = useState<string[]>([]);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async () => {
    // Extract user words (excluding original words)
    const userInputWords = words.slice(originalWords.length);
    
    // Skip submission if no user words
    if (userInputWords.filter(w => w.trim()).length === 0) {
      return;
    }
    // Early return if there are duplicates
    if(new Set(words).size !== words.length){
      setErrorMessage('Duplicate words detected. Please use unique words.');
      setIsErrorModalOpen(true);
      return;
    }
    setUserWords(userInputWords);
    setStatus('loading');
    
    try {
      const result = await finalSubmit.sendData(words);
      
      // Check if there was an error
      if (!result.success) {
        setStatus('error');
        
        // Handle 400 error - likely a misspelled word
        if (result.error?.code === 400) {
          setErrorMessage('One or more words may be misspelled. Please check your spelling and try again.');
          setIsErrorModalOpen(true);
        } else {
          // Handle other errors
          setErrorMessage(result.error?.message || 'An unknown error occurred.');
          setIsErrorModalOpen(true);
        }
        return;
      }
      
      // Process successful response
      let scoreValue;
      let wordsData;
      
      if (typeof result.data === 'string') {
        // Try to parse as JSON if it's a string
        try {
          const parsed = JSON.parse(result.data);
          scoreValue = parsed.score;
          wordsData = parsed.data;
        } catch (e) {
          // If parsing fails, treat it as a raw score
          scoreValue = parseInt(result.data) || 0;
        }
      } else if (typeof result.data === 'object') {
        // It's already a parsed object
        scoreValue = result.data.score;
        wordsData = result.data.data;
      }
      
      // Scale the score if needed
      if (scoreValue) {
        scoreValue *= 0.01;
      }
      
      setScoreData(scoreValue); 
      console.log(`Score: ${scoreValue}`);
      
      if (wordsData) {
        setUserWords(wordsData);
      }
      
      setStatus('success');
    } catch (error) {
      console.error(`ERROR: ${error}`);
      setStatus('error');
      setErrorMessage('An unexpected error occurred. Please try again later.');
      setIsErrorModalOpen(true);
    }
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setStatus('idle');
  };

  return (
    <>
      {/* Loading overlay */}
      {status === 'loading' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <div className="text-xl mb-4">Calculating your score...</div>
            <div className="w-12 h-12 border-4 border-black border-t-black rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}
      
      {/* Error Modal */}
      <Modal
        isOpen={isErrorModalOpen}
        onClose={closeErrorModal}
      >
        <h2 className="text-center text-xl font-medium mb-4">Error</h2>
        <p className="mb-6">{errorMessage}</p>
        <div className="flex justify-center">
          <button
            onClick={closeErrorModal}
            className="border border-black py-2 px-6 text-lg font-mono uppercase hover:bg-black hover:text-white transition-colors duration-200"
          >
            OK
          </button>
        </div>
      </Modal>
      
      {/* Submit button */}
      <div className={`w-full flex items-center "fixed bottom-2 left-0 px-4 max-w-sm mx-auto right-0"`}>
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
          score={scoreData} 
          words={originalWords}
          userWords={userWords}
          autoScroll={true}
        />
      )}
    </>
  );
};

export default SendRequestButton;