import React from 'react';
import Puzzle from '../components/Puzzle';
import { useNavigate } from 'react-router-dom';

function PuzzlePage() {
  const navigate = useNavigate();
  const puzzle = { imageUrl: 'https://via.placeholder.com/300' }; // Replace with actual puzzle data

  const checkAnswer = (answer) => {
    // Logic to check if the answer is correct
    console.log(`Checking answer: ${answer}`);
    // If correct, move to the next puzzle or update state
    navigate('/leaderboard');
  };

  return (
    <div>
      <h2>Current Puzzle</h2>
      <Puzzle puzzle={puzzle} onCheckAnswer={checkAnswer} />
    </div>
  );
}

export default PuzzlePage;
