import React from 'react';

// This is a placeholder div for the threejs animation that will be implemented separately
const AnimationPlaceholder: React.FC = () => {
  return (
    <div 
      id="animation-container"
      className="border-l border-gray-300 flex items-center justify-center"
      style={{ height: '66%' }}
    >
      {/* This div will be replaced with a threejs animation */}
      <div className="text-center text-gray-400">
        Animation Placeholder
      </div>
    </div>
  );
};

export default AnimationPlaceholder;