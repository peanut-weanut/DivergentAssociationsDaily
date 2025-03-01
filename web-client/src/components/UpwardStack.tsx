import { useState, useEffect } from 'react';

const UpwardStack = () => {
  const [items, setItems] = useState([1]);
  const [positions, setPositions] = useState<Record<number, number>>({});
  const itemHeight = 64;
  const gap = 8;
  const maxItems = 10;
  const containerHeight = 400;

  const addItem = () => {
    setItems(prev => {
      if (prev.length >= maxItems) {
        return prev;
      }
      return [...prev, prev.length + 1];
    });
  };

  useEffect(() => {
    const newPositions: Record<number, number> = {};
    items.forEach((item, index) => {
      const reverseIndex = items.length - 1 - index;
      newPositions[item] = reverseIndex * (itemHeight + gap);
    });
    setPositions(newPositions);
  }, [items]);

  return (
    <div className="relative h-screen flex items-end">
      <div 
        className="w-full overflow-y-auto"
        style={{
          height: `${containerHeight}px`,
        }}
      >
        <div 
          className="relative w-full"
          style={{
            height: `${Math.max(containerHeight, items.length * (itemHeight + gap))}px`,
          }}
        >
          {items.map((number) => (
            <div 
              key={number}
              className={`
                absolute left-0 right-0
                bg-gray-200 p-4 rounded text-center
                transition-all duration-500 ease-in-out hover:scale-102
                ${number === items[items.length - 1] && items.length < maxItems ? 'cursor-pointer hover:bg-gray-300' : ''}
              `}
              style={{
                transform: `translateY(-${positions[number] || 0}px) scale(${number === items[items.length - 1] ? 1.02 : 1})`,
                bottom: '0',
              }}
              onClick={number === items[items.length - 1] && items.length < maxItems ? addItem : undefined}
            >
              {number}
              {items.length === maxItems && number === items[items.length - 1] && 
                <span className="text-gray-500 text-sm"> (Max reached)</span>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpwardStack;
