import React, { useContext, useState, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';
import { GameContext } from '../context/GameContext';
import puzzles from '../services/puzzleService';

const Puzzle = ({ puzzleId, onPuzzleSolved }) => {
    const { shuffledPuzzles, currentPuzzleIndex } = useContext(GameContext);

    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [randomImage, setRandomImage] = useState(null);
    const [scanError, setScanError] = useState('');
    const [showScanner, setShowScanner] = useState(false);

    const puzzle = puzzles.find(p => p.id === puzzleId);
    const isCameraSupported = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;

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
            puzzle.type === 'qr-code' ? puzzle.data.answer : 
            '';

        const isAnswerCorrect = input.toLowerCase() === correctAnswer.toLowerCase();
        setIsCorrect(isAnswerCorrect);
        setScanError(isAnswerCorrect || puzzle.type !== 'qr-code' ? '' : 'Try again..');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isCorrect) {
            onPuzzleSolved();
            setAnswer('');
            setIsCorrect(false);
            setShowScanner(false);
        }
    };

    const handleChange = (e) => {
        const input = e.target.value;
        setAnswer(input);
        handleCheckAnswer(input);
    };

    const handleScan = (data) => {
        if (data) handleCheckAnswer(data.text);
    };

    const handleError = (err) => {
        console.error(err);
    };

    const previewStyle = {
        height: 240,
        width: 320,
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
            {puzzle.type === 'qr-code' && isCameraSupported && (
                <>
                    <p>Correct! Head to {shuffledPuzzles[currentPuzzleIndex].data.answer.toUpperCase()} station. Once you complete the station, you'll receive a QR code to scan and proceed.</p>
                    {showScanner && (
                        <div className="qr-scanner-container">
                            <QrScanner
                                delay={300}
                                style={previewStyle}
                                onScan={handleScan}
                                onError={handleError}
                                facingMode="environment"
                            />
                            {scanError && <p className="error-message">{scanError}</p>}
                        </div>
                    )}
                    <button
                        onClick={() => setShowScanner(!showScanner)}
                        className="puzzle-button"
                        style={{ marginBottom: '10px' }}
                    >
                        Scan QR Code
                    </button>
                </>
            )}
            {puzzle.type === 'qr-code' && !isCameraSupported && (
                <p>QR scanning is not supported on this device/browser.</p>
            )}

            <form onSubmit={handleSubmit} className="puzzle-form">
                {puzzle.type !== 'qr-code' && (
                    <>
                        { puzzleId !== 2 && (<p>Guess the country?</p>)}
                        <input
                            type="text"
                            value={answer}
                            onChange={handleChange}
                            placeholder="Enter your answer"
                            className={`puzzle-input ${answer ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                            style={{ margin: 0 }}
                        />
                    </>
                )}
                <button
                    type="submit"
                    className="puzzle-button"
                    disabled={!isCorrect}
                    style={{ margin: 0 }}
                >
                    Next Puzzle
                </button>
            </form>
        </div>
    );
};

export default Puzzle;
