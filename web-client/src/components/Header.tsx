import React from 'react';

interface HeaderProps {
  leftContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

const Header = ({ leftContent, centerContent, rightContent }: HeaderProps) => {
  return (
    <div className="w-full flex items-center justify-between py-4 px-2">
      <div className="flex-1">{leftContent}</div>
      <div className="flex-1 text-center">{centerContent}</div>
      <div className="flex-1 flex justify-end">{rightContent}</div>
    </div>
  );
};

export default Header;