import React from 'react';

const DesktopHeader: React.FC = () => {
  return (
    <div className="flex items-center py-3 px-4 mx-auto">
      <div className="w-1/4 text-xl font-bold font-mono text-left">FOOL</div>
      <div className="w-1/2 text-2xl text-center">
        <span className="font-black">WORD</span>
        <span>WORD</span>
        <span className="font-black">WORD</span>
      </div>
      <div className="w-1/4 font-mono text-right">more games</div>
    </div>
  );
};

export default DesktopHeader;