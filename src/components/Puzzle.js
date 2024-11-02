import React, { useContext, useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { GameContext } from '../context/GameContext';
import puzzles from '../services/puzzleService';

const Puzzle = ({ puzzleId, onPuzzleSolved }) => {
    const { shuffledPuzzles, currentPuzzleIndex, setTriggerQRCode } = useContext(GameContext);

    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [randomImage, setRandomImage] = useState(null);
    const [scanError, setScanError] = useState('');
    const [showScanner, setShowScanner] = useState(false);
    const [facingMode, setFacingMode] = useState('environment');

    const puzzle = puzzles.find(p => p.id === puzzleId);
    const isCameraSupported = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;

    useEffect(() => {
        if (puzzle.type === 'array') {
            const randomData = puzzle.data[Math.floor(Math.random() * puzzle.data.length)];
            setRandomImage(randomData);
        }

        const checkCameraAvailability = async () => {
            try {
                await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            } catch (error) {
                setFacingMode('user');
            }
        };

        if (isCameraSupported) {
            checkCameraAvailability();
        }
    }, [puzzle, isCameraSupported]);

    const handleCheckAnswer = (input) => {
        const correctAnswer = 
            puzzle.type === 'array' ? randomImage?.answer :
            puzzle.type === 'text' || puzzle.type === 'image' ? puzzle.data.answer :
            puzzle.type === 'qr-code' ? puzzle.data.answer : 
            '';

        const isAnswerCorrect = input.toLowerCase().trim() === correctAnswer.toLowerCase();
        setIsCorrect(isAnswerCorrect);
        if (isAnswerCorrect && puzzle.type === 'qr-code') setTriggerQRCode(false);
        if (isAnswerCorrect) setScanError('');
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
        if (data) handleCheckAnswer(data);
    };

    const handleError = (err) => {
        // console.error(err);
        setScanError('Try again!');
    };

    if (facingMode) {};

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
                    <p>Correct! Head to {shuffledPuzzles[currentPuzzleIndex].data.answer.toUpperCase()} station{shuffledPuzzles[currentPuzzleIndex].data.rooms ?
                    ' at ' + shuffledPuzzles[currentPuzzleIndex].data.rooms : ''}. Once you complete the station, you'll receive a QR code to scan and proceed.</p>
                    {showScanner && (
                        <div className="qr-scanner-container">
                            <QrReader
                                delay={300}
                                onError={handleError}
                                onScan={handleScan}
                                style={{ width: '100%', height: '100%' }}
                                constraints={{ facingMode: { exact: 'environment' } }}
                                onResult={(result, error) => {
                                    if (!!result) handleScan(result?.text);
                                    if (!!error) handleError(error);
                                }}
                                // facingMode="environment"
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
