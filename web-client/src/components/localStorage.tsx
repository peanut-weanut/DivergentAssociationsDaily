// Game Storage Manager
const GameStorage = {
    // Save game score
    saveScore(score: number): void {
        console.log('Saving score:', score); // Add logging
        localStorage.setItem('gameScore', score.toFixed(2));
    },

    // Get previous game score
    getScore(): number {
        return parseFloat(localStorage.getItem('gameScore') || '0.00');
    },

    // Save used words
    saveUsedWords(words: string[]): void {
        // Ensure we keep only the most recent 10 words
        const existingWords = this.getUsedWords();
        const updatedWords = [...existingWords, ...words]
            .slice(-10) // Keep last 10 words
            .filter((word, index, self) => 
                self.indexOf(word) === index // Remove duplicates
            );
        console.log('Saving words:', words); // Add logging
        localStorage.setItem('usedWords', JSON.stringify(updatedWords));
    },

    // Get used words
    getUsedWords(): string[] {
        return JSON.parse(localStorage.getItem('usedWords') || '[]');
    },

    // Check if a word has been used before
    isWordUsed(word: string): void {
        if(this.getUsedWords().includes(word)){
            throw new Error(`this word, ${word} is in the list`)
        }
    },

    // Clear all game data
    clearGameData(): void {
        localStorage.removeItem('gameScore');
        localStorage.removeItem('usedWords');
    }
};

export default GameStorage;