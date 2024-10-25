import React, { useState } from 'react';
import puzzles from '../services/puzzleService';

const Puzzle = ({ puzzleId, onPuzzleSolved }) => {
    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const puzzle = puzzles.find(p => p.id === puzzleId);

    const handleCheckAnswer = (input) => {
        if (input.toLowerCase() === puzzle.answer.toLowerCase()) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isCorrect) {
            onPuzzleSolved();
            setAnswer('');
        }
    };

    const handleChange = (e) => {
        const input = e.target.value;
        setAnswer(input);
        handleCheckAnswer(input);
    };

    return (
        <div className="puzzle-container">
            <img src={puzzle.imageUrl.trim().startsWith('http') ? puzzle.imageUrl : process.env.PUBLIC_URL + puzzle.imageUrl} alt="Puzzle" className="puzzle-image"/>
            <form onSubmit={handleSubmit} className="puzzle-form">
                <input
                    type="text"
                    value={answer}
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    className={`puzzle-input ${answer ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                />
                <button
                    type="submit"
                    className="puzzle-button"
                    disabled={!answer || !isCorrect}
                >
                    Next Puzzle
                </button>
            </form>
        </div>
    );
};

export default Puzzle;
