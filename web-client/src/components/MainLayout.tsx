import { useState, useEffect, useRef } from 'react';
import Modal from '@/components/Modal';
import GameContent from '@/components/GameContent';
import DesktopHeader from '@/components/DesktopHeader';
import MobileHeader from '@/components/MobileHeader';
import SideMenu from '@/components/SideMenu';
import AnimationPlaceholder from '@/components/AnimatedBackground';
import { getDailyWords } from '@/lib/api-client';

// Extend the global Window interface to include our modal opener function
declare global {
  interface Window {
    openHelpModal?: () => void;
  }
}

const MainLayout = () => {
  // Daily words state
  const [dailyWords, setDailyWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Title state based on API response
  const [showAltTitle, setShowAltTitle] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Viewport width for responsive layout
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Use ref to prevent duplicate fetch
  const fetchedRef = useRef(false);
  
  // Fetch daily words once on mount
  useEffect(() => {
    const fetchDailyWords = async () => {
      // Skip if already fetched
      if (fetchedRef.current) return;
      
      try {
        setIsLoading(true);
        // Mark as fetched to prevent duplicate requests
        fetchedRef.current = true;
        
        const response = await getDailyWords.getData();
        const parsedResponse = JSON.parse(response);
        
        // Check for words array
        const words = parsedResponse.data;
        setDailyWords(Array.isArray(words) ? words : ["WORDS", "NOT", "FOUND"]);
        
        // Set the title flag based on API response
        setShowAltTitle(parsedResponse.title);
      } catch (error) {
        console.error("Failed to fetch daily words:", error);
        // Fallback words if API fails
        setDailyWords(["ERROR", "LOADING", "WORDS"]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDailyWords();
  }, []);
  
  // Check viewport width on mount and resize
  useEffect(() => {
    const checkViewport = () => {
      // Use aspect ratio: if width > height, it's desktop
      setIsDesktop(window.innerWidth > window.innerHeight);
    };
    
    // Initial check
    checkViewport();
    
    // Add resize listener
    window.addEventListener('resize', checkViewport);
    
    // Expose modal opener for the GameContent component
    window.openHelpModal = () => setIsModalOpen(true);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkViewport);
      delete window.openHelpModal;
    };
  }, []);

  // Get the current title based on the API response flag
  const getTitle = () => {
    return showAltTitle ? (
      <span className="font-black">WORD<span className="font-normal">WORD</span>WORD</span>
    ) : (
      <span>Divergent Associations Daily</span>
    );
  };

  // Mobile layout
  const MobileLayout = () => (
    <div className="w-full h-full flex flex-col bg-white">
      <div className="text-center py-3 mt-2">
        <div className="text-2xl">
          {getTitle()}
        </div>
      </div>
      <div className="px-4 flex-1 pb-2 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">Loading words...</div>
          </div>
        ) : (
          <GameContent todaysWords={dailyWords} isMobile={true} />
        )}
      </div>
    </div>
  );
  
  // Desktop layout
  const DesktopLayout = () => (
    <div className="flex flex-col h-screen w-full">
      {/* Header */}
      <div className="bg-white border-b border-gray-300">
        <div className="flex items-center py-3 px-4 mx-auto">
          <div className="w-1/4 text-xl font-bold font-mono text-left">FOOL</div>
          <div className="w-1/2 text-2xl text-center">
            {getTitle()}
          </div>
          <div className="w-1/4 font-mono text-right">more games</div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 relative">
        {/* Background animation (positioned absolutely behind everything) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4/5 h-4/5 border-2 border-gray-600 z-0 bg-white">
            <AnimationPlaceholder />
          </div>
        </div>
        
        {/* Content overlays */}
        <div className="h-full relative mx-auto" style={{ maxWidth: "1200px" }}>
          {/* Game content column (fixed width, centered) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[528px] h-full bg-white border-l border-r border-gray-300 z-20">
            <div className="px-4 py-4 h-full overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">Loading words...</div>
                </div>
              ) : (
                <GameContent todaysWords={dailyWords} />
              )}
            </div>
          </div>
          
          {/* Side menu (positioned relative to container) */}
          <div className="absolute left-1/6 transform -translate-x-1/1 top-1/2 -translate-y-1/2 z-10">
            <div className="bg-white border border-gray-300">
              <SideMenu />
            </div>
          </div>
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
      <h2 className="text-center text-xl font-medium mb-1">Game info</h2>
      <hr className="border-t border-gray-800 mb-4" />
      
      <p className="mb-4">
        Please enter 5 words that are as <strong>different</strong> from each other and 
        from the theme words as possible, in all meanings and 
        uses of the words.
      </p>
      
      <p className="mb-2">The rules are</p>
      <ol className="list-decimal pl-8 space-y-1">
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