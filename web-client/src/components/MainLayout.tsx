import { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import { sendWords } from '@/lib/api-client';

const MainLayout = () => {
  // Today's words
  const todaysWords = ["SOLVENT", "PREHISTORY", "CRACKERJACK"];
  
  // User input words
  const [userInputs, setUserInputs] = useState<string[]>(Array(5).fill(''));
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form submission state
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [response, setResponse] = useState<string>('');
  
  // Viewport width for responsive layout
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Check viewport width on mount and resize
  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    // Initial check
    checkViewport();
    
    // Add resize listener
    window.addEventListener('resize', checkViewport);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

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

  // Game content - shared between mobile and desktop
  const GameContent = () => (
    <div className="flex flex-col items-center">
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
          <input
            key={index}
            type="text"
            value={userInputs[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder="Enter text..."
            className="w-full border border-gray-300 rounded-md py-2 px-3 font-mono"
          />
        ))}
      </div>
      
      {/* Divider */}
      <hr className="w-full border-t border-gray-300 my-4" />
      
      {/* Submit button */}
      <div className="w-full flex items-center">
        <button
          onClick={handleSubmit}
          disabled={status === 'loading'}
          className="flex-1 border border-black py-3 text-xl font-mono uppercase"
        >
          Submit
        </button>
        
        {!isDesktop && (
          <button
            onClick={() => setIsModalOpen(true)}
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
  
  // Game rules for desktop sidebar
  const GameRules = () => (
    <div className="p-4">
      <h3 className="text-center mb-4">Game info</h3>
      <hr className="mb-4" />
      <ol className="list-decimal pl-5 space-y-2">
        <li>Only single words in English.</li>
        <li>Only nouns (e.g., things, objects, concepts).</li>
        <li>No proper nouns (e.g., no specific people or places).</li>
        <li>No specialised vocabulary (e.g., no technical terms).</li>
        <li>Think of the words on your own (e.g., do not just look at objects in your surroundings).</li>
      </ol>
    </div>
  );

  // Mobile layout
  const MobileLayout = () => (
    <div className="max-w-sm mx-auto px-4 py-2 flex flex-col h-full bg-white">
      {/* Header */}
      <div className="text-center py-3">
        <div className="text-2xl">
          <span className="font-black">WORD</span>
          <span>WORD</span>
          <span className="font-black">WORD</span>
        </div>
      </div>
      
      {/* Game content */}
      <GameContent />
    </div>
  );
  
  // Desktop layout
  const DesktopLayout = () => (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-300 py-3 px-4">
        <div className="text-xl font-bold font-mono">FOOL</div>
        <div className="text-2xl">
          <span className="font-black">WORD</span>
          <span>WORD</span>
          <span className="font-black">WORD</span>
        </div>
        <div className="font-mono">more games</div>
      </div>
      
      {/* Content */}
      <div className="flex flex-1 border-t border-gray-300">
        {/* Left sidebar */}
        <div className="w-1/3 border-r border-gray-300">
          <GameRules />
        </div>
        
        {/* Center content */}
        <div className="w-1/3 px-4 py-4">
          <GameContent />
        </div>
        
        {/* Right sidebar - pattern */}
        <div className="w-1/3 border-l border-gray-300 relative">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(black 1px, transparent 0)', 
            backgroundSize: '10px 10px' 
          }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isDesktop ? <DesktopLayout /> : <MobileLayout />}
      
      {/* Help Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      >
        <h2 className="text-xl font-bold mb-4 font-mono">Game Rules</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Only single words in English.</li>
          <li>Only nouns (e.g., things, objects, concepts).</li>
          <li>No proper nouns (e.g., no specific people or places).</li>
          <li>No specialised vocabulary (e.g., no technical terms).</li>
          <li>Think of the words on your own (e.g., do not just look at objects in your surroundings).</li>
        </ol>
      </Modal>
    </>
  );
};

export default MainLayout;