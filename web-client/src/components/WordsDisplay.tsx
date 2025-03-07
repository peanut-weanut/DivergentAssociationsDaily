import React from 'react';

interface WordsDisplayProps {
  title?: string;
  words: string[];
}

const WordsDisplay = ({ title = "Today's words are:", words }: WordsDisplayProps) => {
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