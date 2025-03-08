import React, { useState, useEffect } from 'react';
import { getDailyWords } from '@/lib/api-client';

interface WordsDisplayProps {
  title?: string;
  words?: string[];
  onWordsLoaded?: (words: string[]) => void;
}

const WordsDisplay = ({ 
  title = "Today's words are:", 
  words: initialWords,
  onWordsLoaded
}: WordsDisplayProps) => {
  const [words, setWords] = useState<string[]>(initialWords || []);
  const [loading, setLoading] = useState(!initialWords);

  useEffect(() => {
    if (!initialWords) {
      const fetchDailyWords = async () => {
        try {
          setLoading(true);
          const response = await getDailyWords.getData();
          // Assuming response is a JSON string containing an array of words
          const parsedWords = JSON.parse(response);
          setWords(Array.isArray(parsedWords) ? parsedWords : []);
          
          if (onWordsLoaded && Array.isArray(parsedWords)) {
            onWordsLoaded(parsedWords);
          }
        } catch (error) {
          console.error("Failed to fetch daily words:", error);
          setWords(["Error", "loading", "words"]);
        } finally {
          setLoading(false);
        }
      };

      fetchDailyWords();
    }
  }, [initialWords, onWordsLoaded]);

  if (loading) {
    return (
      <div className="border border-black p-4 mx-auto mb-4 w-full max-w-md text-center">
        <div className="text-xl mb-2">{title}</div>
        <div className="text-lg my-2">Loading words...</div>
      </div>
    );
  }

  return (
    <div className="border border-black p-4 mx-auto mb-4 w-full max-w-md text-center">
      <div className="text-xl mb-2">{title}</div>
      {words.map((word, index) => (
        <div key={index} className="text-3xl font-mono uppercase my-2">
          {word}
        </div>
      ))}
    </div>
  );
};

export default WordsDisplay;