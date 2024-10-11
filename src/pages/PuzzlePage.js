import React from 'react';
import Puzzle from '../components/Puzzle';

function PuzzlePage() {
  const puzzle = { imageUrl: 'https://via.placeholder.com/300' }; // Replace with actual puzzle data

  const checkAnswer = (answer) => {
    // Logic to check if the answer is correct
    console.log(`Checking answer: ${answer}`);
    // If correct, move to the next puzzle or update state
  };

  return (
    <div>
      <h2>Current Puzzle</h2>
      <Puzzle puzzle={puzzle} onCheckAnswer={checkAnswer} />
    </div>
  );
}

export default PuzzlePage;
