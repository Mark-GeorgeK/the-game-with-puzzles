import React from 'react';
import PlayerForm from '../components/PlayerForm';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleStartGame = (player1, player2) => {
    // Save player names in state/context or local storage
    // For now, navigate to the puzzle page
    navigate('/puzzle');
  };

  return (
    <div>
      <h1>Welcome to the Puzzle Game</h1>
      <PlayerForm onStartGame={handleStartGame} />
    </div>
  );
}

export default HomePage;
