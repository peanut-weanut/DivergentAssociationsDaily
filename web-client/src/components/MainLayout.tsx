import { useState, useEffect } from 'react';
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
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Viewport width for responsive layout
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Fetch daily words on mount
  useEffect(() => {
    const fetchDailyWords = async () => {
      try {
        setIsLoading(true);
        const response = await getDailyWords.getData();
        // Assuming response is a JSON string containing an array of words
        const parsedWords = JSON.parse(response);
        setDailyWords(Array.isArray(parsedWords) ? parsedWords : []);
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
      setIsDesktop(window.innerWidth >= 768);
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

  // Mobile layout
  const MobileLayout = () => (
    <div className="w-full h-full flex flex-col bg-white">
      <MobileHeader />
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
        <DesktopHeader />
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
        <div className="h-full relative flex items-center justify-between mx-auto" style={{ maxWidth: "1200px" }}>
          {/* Left area - containing the menu */}
          <div className="w-1/3 flex justify-center z-10">
            <div className="bg-white border border-gray-300">
              <SideMenu />
            </div>
          </div>
          
          {/* Center game column (fixed width) */}
          <div className="w-[528px] h-full bg-white border-l border-r border-gray-300 z-20">
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
          
          {/* Right area - empty space for balance */}
          <div className="w-1/3"></div>
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