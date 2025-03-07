import React from 'react';

// This is a placeholder for the menu that will be implemented by another Claude instance
const SideMenu: React.FC = () => {
  return (
    <div className="h-full">
      <div className="p-4">
        <div className="text-center uppercase font-bold mb-4">Game Info</div>
        <hr className="mb-4" />
        
        {/* These menu items are placeholders and will be implemented by another agent */}
        <div className="space-y-4">
          <div className="text-center py-2 uppercase">Game Info</div>
          <hr />
          <div className="text-center py-2 uppercase">Statistics</div>
          <hr />
          <div className="text-center py-2 uppercase">Leaderboard</div>
          <hr />
          <div className="text-center py-2 uppercase">History</div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;