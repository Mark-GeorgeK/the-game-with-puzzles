import React, { useState, useEffect } from 'react';
import puzzles from '../services/puzzleService';

const Puzzle = ({ puzzleId, onPuzzleSolved }) => {
    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [randomImage, setRandomImage] = useState(null);

    const puzzle = puzzles.find(p => p.id === puzzleId);

    useEffect(() => {
        if (puzzle.type === 'array') {
            const randomData = puzzle.data[Math.floor(Math.random() * puzzle.data.length)];
            setRandomImage(randomData);
        }
    }, [puzzle]);

    const handleCheckAnswer = (input) => {
        const correctAnswer = 
            puzzle.type === 'array' ? randomImage?.answer :
            puzzle.type === 'text' || puzzle.type === 'image' ? puzzle.data.answer :
            '';

        setIsCorrect(input.toLowerCase() === correctAnswer.toLowerCase());
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
            {puzzle.type === 'array' && randomImage && (
                <img
                    src={randomImage.imageUrl.trim().startsWith('http') ? randomImage.imageUrl : process.env.PUBLIC_URL + randomImage.imageUrl}
                    alt="Puzzle"
                    className="puzzle-image"
                />
            )}
            {puzzle.type === 'text' && (
                <div className="puzzle-text">
                    {puzzle.data.clue}
                </div>
            )}
            {puzzle.type === 'image' && (
                <img
                    src={puzzle.data.imageUrl.trim().startsWith('http') ? puzzle.data.imageUrl : process.env.PUBLIC_URL + puzzle.data.imageUrl}
                    alt="Puzzle"
                    className="puzzle-image"
                />
            )}

            <form onSubmit={handleSubmit} className="puzzle-form">
                <input
                    type="text"
                    value={answer}
                    onChange={handleChange}
                    placeholder="Enter your answer"
                    className={`puzzle-input ${answer ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                    style={{ margin: 0 }}
                />
                <button
                    type="submit"
                    className="puzzle-button"
                    disabled={!answer || !isCorrect}
                    style={{ margin: 0 }}
                >
                    Next Puzzle
                </button>
            </form>
        </div>
    );
};

export default Puzzle;
