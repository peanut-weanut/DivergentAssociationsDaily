import { useState } from "react";
import { finalSubmit } from '@/lib/api-client';
import ScoreScreen from './ScoreScreen';

interface RequestProps {
  words: string[];
  isMobile?: boolean;
  originalWords: string[]; // Added to track original daily words
}

const SendRequestButton: React.FC<RequestProps> = ({ 
  words, 
  originalWords, 
  isMobile = false 
}) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [scoreData, setScoreData] = useState<{ score: number } | null>(null);
  const [userWords, setUserWords] = useState<string[]>([]);

  return (
    <>
      {/* Loading overlay */}
      {status === 'loading' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg">
            <div className="text-xl mb-4">Calculating your score...</div>
            <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      )}
      
      {/* Score screen - only rendered when we have score data */}
      {scoreData && (
        <ScoreScreen 
          score={scoreData.score} 
          words={originalWords}
          userWords={userWords}
          autoScroll={true}
        />
      )}
    </>
  );
};

export default SendRequestButton;