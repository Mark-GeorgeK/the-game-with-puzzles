import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [teamResults, setTeamResults] = useState([]);

  const startGame = (player1, player2) => {
    setPlayers([{ name: player1 }, { name: player2 }]);
    setCurrentPuzzleIndex(0);
    setTeamResults([]);
  };

  const nextPuzzle = () => {
    setCurrentPuzzleIndex((prevIndex) => prevIndex + 1);
  };

  const updateResults = (result) => {
    setTeamResults((prevResults) => [...prevResults, result]);
  };

  return (
    <GameContext.Provider value={{ players, currentPuzzleIndex, teamResults, startGame, nextPuzzle, updateResults }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};
