import React, { createContext, useState, useEffect } from 'react';
import puzzles from '../services/puzzleService';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [teamToken, setTeamToken] = useState(localStorage.getItem('teamToken') || '');
    const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(parseInt(localStorage.getItem('currentPuzzleIndex')) || 0);
    const [shuffledPuzzles, setShuffledPuzzles] = useState([]);
    const [teamName, setTeamName] = useState(localStorage.getItem('teamName') || '');

    useEffect(() => {
        const savedPuzzles = localStorage.getItem('shuffledPuzzles');
        if (savedPuzzles) setShuffledPuzzles(JSON.parse(savedPuzzles));
    }, []);

    const shufflePuzzles = () => {
        const shuffled = [...puzzles].sort(() => Math.random() - 0.5);
        setShuffledPuzzles(shuffled);
        localStorage.setItem('shuffledPuzzles', JSON.stringify(shuffled));
    };

    useEffect(() => {
        localStorage.setItem('teamToken', teamToken);
    }, [teamToken]);

    useEffect(() => {
        localStorage.setItem('currentPuzzleIndex', currentPuzzleIndex);
    }, [currentPuzzleIndex]);

    useEffect(() => {
        localStorage.setItem('teamName', teamName);
    }, [teamName]);

    return (
        <GameContext.Provider value={{
            teamName,
            setTeamName,
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
