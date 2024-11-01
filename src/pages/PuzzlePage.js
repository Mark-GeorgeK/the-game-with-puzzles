import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../context/GameContext';
import Puzzle from '../components/Puzzle';
import ProgressBar from '../components/ProgressBar';
import puzzles from '../services/puzzleService';
import { db } from '../firebaseConfig';
import { doc, updateDoc, increment } from 'firebase/firestore';
import '../styles/PuzzlePage.css';

const PuzzlePage = () => {
    const { teamToken, currentPuzzleIndex, setCurrentPuzzleIndex, shuffledPuzzles, triggerQRCode, setTriggerQRCode } = useContext(GameContext);
    const [currentPuzzle, setCurrentPuzzle] = useState(shuffledPuzzles[currentPuzzleIndex]);
    const navigate = useNavigate();

    useEffect(() => {
        if (shuffledPuzzles.length === 0 || currentPuzzleIndex >= shuffledPuzzles.length) navigate('/');
        else setCurrentPuzzle(shuffledPuzzles[currentPuzzleIndex]);
    }, [shuffledPuzzles, currentPuzzleIndex, navigate]);

    const handleNextPuzzle = async () => {
        const nextIndex = currentPuzzleIndex + 1;

        if (triggerQRCode) {
            setTriggerQRCode(false);
            setCurrentPuzzle(puzzles[shuffledPuzzles[currentPuzzleIndex].next]);
        } else {
            const teamRef = doc(db, 'teams', teamToken);
            await updateDoc(teamRef, {
                puzzlesSolved: increment(1)
            });

            setTriggerQRCode(true);
            setCurrentPuzzle(shuffledPuzzles[nextIndex]);
            setCurrentPuzzleIndex(nextIndex);
        }

        if (!triggerQRCode && (nextIndex >= shuffledPuzzles.length)) {
            navigate('/leaderboard');
        }
    };

    return (
        <div>
            <ProgressBar totalPuzzles={shuffledPuzzles.length} currentPuzzleIndex={currentPuzzleIndex} />
            {currentPuzzle ? (
                <Puzzle puzzleId={currentPuzzle.id} onPuzzleSolved={handleNextPuzzle} />
            ) : (
                <p>Loading puzzle...</p>
            )}
        </div>
    );
};

export default PuzzlePage;
