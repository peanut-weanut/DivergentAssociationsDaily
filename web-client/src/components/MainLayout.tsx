import { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import GameContent from '@/components/GameContent';
import DesktopHeader from '@/components/DesktopHeader';
import MobileHeader from '@/components/MobileHeader';
import SideMenu from '@/components/SideMenu';
import AnimationPlaceholder from '@/components/AnimatedBackground';

// Extend the global Window interface to include our modal opener function
declare global {
  interface Window {
    openHelpModal?: () => void;
  }
}

const MainLayout = () => {
  // Today's words
  const todaysWords = ["SOLVENT", "PREHISTORY", "CRACKERJACK"];
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
        <GameContent todaysWords={todaysWords} isMobile={true} />
      </div>
    </div>
  );
  
  // Desktop layout
  const DesktopLayout = () => (
    <div className="flex flex-col h-screen w-full">
      {/* Header */}
      <DesktopHeader />
      
      {/* Main content area */}
      <div className="flex-1 relative">
        {/* Background animation (positioned absolutely behind everything) */}
        <div className="absolute inset-0 bg-black">
          <div className="h-full w-full flex items-center justify-center">
            <AnimationPlaceholder />
          </div>
        </div>
        
        {/* Content columns as overlays */}
        <div className="flex h-full relative">
          {/* Left menu column (20%) */}
          <div className="w-1/5 bg-white border-r border-gray-300 overflow-y-auto">
            <SideMenu />
          </div>
          
          {/* Middle space (60%) - transparent for animation */}
          <div className="w-3/5"></div>
          
          {/* Right game column (20%) */}
          <div className="w-1/5 bg-white border-l border-gray-300 overflow-y-auto">
            <div className="px-4 py-4">
              <GameContent todaysWords={todaysWords} />
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