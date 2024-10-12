import React, { useState } from 'react';
import puzzles from '../services/puzzleService';

const Puzzle = ({ puzzleId, onPuzzleSolved }) => {
    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const puzzle = puzzles.find(p => p.id === puzzleId);

    const handleCheckAnswer = () => {
        if (answer.toLowerCase() === puzzle.answer.toLowerCase()) {
            setIsCorrect(true);
            onPuzzleSolved();  // Trigger the next puzzle logic
        } else {
            setIsCorrect(false);
        }
    };

    return (
        <div>
            <img src={puzzle.imageUrl} alt="Puzzle" />
            <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer"
            />
            <button onClick={handleCheckAnswer}>Check Answer</button>
            {isCorrect && <p>Correct! Moving to the next puzzle...</p>}
            {!isCorrect && answer && <p>Incorrect. Try again.</p>}
        </div>
    );
};

export default Puzzle;
