import React, { createContext, useState } from 'react';
import puzzles from '../services/puzzleService';  // Import the puzzle list

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [teamToken, setTeamToken] = useState(null);
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);  // Track the current puzzle
    const [shuffledPuzzles, setShuffledPuzzles] = useState([]);      // Store shuffled puzzles

    // Function to shuffle puzzles for each team
    const shufflePuzzles = () => {
        const shuffled = [...puzzles].sort(() => Math.random() - 0.5);  // Shuffle puzzles
        setShuffledPuzzles(shuffled);
    };

    return (
        <GameContext.Provider value={{
            teamToken,
            setTeamToken,
            currentPuzzleIndex,
            setCurrentPuzzleIndex,
            shuffledPuzzles,
            shufflePuzzles
        }}>
            {children}
        </GameContext.Provider>
    );
};
