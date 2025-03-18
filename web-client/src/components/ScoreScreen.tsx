import React, { useEffect, useRef } from 'react';

interface ScoreScreenProps {
  score: number;
  maxScore?: number;
  words: string[];
  userWords: string[];
  autoScroll?: boolean;
}

const ScoreScreen: React.FC<ScoreScreenProps> = ({ 
  score, 
  maxScore = 150, 
  words, 
  userWords,
  autoScroll = true 
}) => {
  const scoreRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Auto-scroll to this component when it mounts if autoScroll is true
    if (autoScroll && scoreRef.current) {
      // Use scrollIntoView with smooth behavior
      scoreRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Alternative approach using scroll directly
      // For browsers that don't fully support scrollIntoView options
      const yOffset = scoreRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: yOffset,
        behavior: 'smooth'
      });
    }
  }, [autoScroll]);
  
  // Calculate percentage for visual representation
  const scorePercentage = Math.min(100, Math.max(0, (score / maxScore) * 100));
  
  return (
    <div 
      ref={scoreRef}
      className="w-full border-t-2 border-black pt-8 mt-8 h-screen flex flex-col items-center"
    >
      <h2 className="text-3xl font-mono uppercase mb-6">Your Score</h2>
      
      {/* Score display */}
      <div className="relative w-64 h-64 mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-5xl font-bold">
            {score.toString().substring(0,5)}
          </div>
        </div>
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="#333333" 
            strokeWidth="8"
          />
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="black" 
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 45 * scorePercentage / 100} ${2 * Math.PI * 45 * (1 - scorePercentage / 100)}`}
            strokeDashoffset="0"
            transform="rotate(-90 50 50)"
          />
        </svg>
      </div>
      
      {/* Word pairings */}
      {/* take in 3 string arrays */}
      <div className="w-full max-w-md border border-black p-6 mb-8">
        <h3 className="text-xl font-mono uppercase mb-4 text-center">Most Unique Pairs</h3>
        <div className="space-y-4">
          {words.map((word, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="text-xl uppercase font-mono">{userWords[index][0]}</div>
              <div className="text-xl">→</div>
              <div className="text-xl uppercase font-mono">{userWords[index][1] || "—"}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Play again button */}
      <button 
        onClick={() => window.location.reload()}
        className="border border-black py-3 px-8 text-xl font-mono uppercase hover:bg-black hover:text-white transition-colors duration-200 mb-16"
      >
        See Your All-Time Statistics (THIS DONT WORK)
      </button>
    </div>
  );
};

export default ScoreScreen;