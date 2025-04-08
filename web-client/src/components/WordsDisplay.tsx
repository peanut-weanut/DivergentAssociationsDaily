import React from 'react';

interface WordsDisplayProps {
  title?: string;
  words: string[];
  isLoading?: boolean;
  onWordsLoaded?: (words: string[]) => void;
}

const WordsDisplay = ({ 
  title = "Today's words are:", 
  words,
  isLoading = false,
  onWordsLoaded
}: WordsDisplayProps) => {
  
  // Call onWordsLoaded callback if provided and we have words
  React.useEffect(() => {
    if (onWordsLoaded && words.length > 0) {
      onWordsLoaded(words);
    }
  }, [words, onWordsLoaded]);

  if (isLoading) {
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
      {words.slice(0,2).map((word, index) => [
        <div key={index} className="text-3xl font-mono uppercase my-2">
          {word}
        </div>,
        words[index + 3] && index < 2 && (
          <div key={`extra-${index}`} className="text-sm font-mono lowercase my-1">
            {words[index + 3]}
          </div>
        ),
      ])}
    </div>
  );
};

export default WordsDisplay;