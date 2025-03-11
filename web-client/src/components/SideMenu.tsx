import React from 'react';

const GameInfo = () => {
  return (
    <div className="border border-gray-800 p-4 max-w-xs">
      <h2 className="text-center text-xl font-medium mb-1">Game info</h2>
      <hr className="border-t border-gray-800 mb-4" />
      
      <p className="mb-4">
        Please enter 5 words that are as <strong>different</strong> from each other and 
        from the theme words as possible, in all meanings and 
        uses of the words.
      </p>
      
      <p className="mb-2">The rules are</p>
      <ol className="list-decimal pl-8 space-y-1">
        <li>Only single words in English.</li>
        <li>Only nouns (e.g., things, objects, concepts).</li>
        <li>No proper nouns (e.g., no specific people or places).</li>
        <li>No specialised vocabulary (e.g., no technical terms).</li>
        <li>Think of the words on your own (e.g., do not just look at objects in your surroundings).</li>
      </ol>
    </div>
  );
};

export default GameInfo;