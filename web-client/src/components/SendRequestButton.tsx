import { useState } from "react";
import { sendWords } from '@/lib/api-client';

interface RequestProps {
  words: string[];
  isMobile?: boolean;
}

const SendRequestButton: React.FC<RequestProps> = ({ words, isMobile = false }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [response, setResponse] = useState<string>('');

  const handleSubmit = async () => {
    setStatus('loading');
    
    try {
      const result = await sendWords.sendData(words);
      setResponse(result);
      setStatus('success');
    } catch (error) {
      console.error(`ERROR: ${error}`);
      setStatus('error');
    }
    
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <>
      {/* Submit button - absolute positioning for mobile */}
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
      
      {/* Response message */}
      {response && (
        <div className="w-full mt-2 text-sm font-mono">
          Response: {response}
        </div>
      )}
    </>
  );
};

export default SendRequestButton;