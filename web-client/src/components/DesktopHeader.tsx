import React from 'react';

const DesktopHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-3 px-4">
      <div className="text-xl font-bold font-mono">FOOL</div>
      <div className="text-2xl">
        <span className="font-black">WORD</span>
        <span>WORD</span>
        <span className="font-black">WORD</span>
      </div>
      <div className="font-mono">more games</div>
    </div>
  );
};

export default DesktopHeader;