import React, { useContext, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import Puzzle from '../components/Puzzle';
import { db } from '../firebaseConfig';
import { doc, updateDoc, increment } from 'firebase/firestore';
import '../styles/PuzzlePage.css'

const PuzzlePage = () => {
    const { teamToken, currentPuzzleIndex, setCurrentPuzzleIndex, shuffledPuzzles } = useContext(GameContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (shuffledPuzzles.length === 0 || currentPuzzleIndex >= shuffledPuzzles.length) {
            navigate('/leaderboard');
        }
    }, [shuffledPuzzles, currentPuzzleIndex, navigate]);

    const handleNextPuzzle = async () => {
        const nextIndex = currentPuzzleIndex + 1;

        const teamRef = doc(db, 'teams', teamToken);
        await updateDoc(teamRef, {
            puzzlesSolved: increment(1)
        });

        setCurrentPuzzleIndex(nextIndex);
        if (nextIndex >= shuffledPuzzles.length) {
            navigate('/leaderboard');
        }
    };

    const currentPuzzle = shuffledPuzzles[currentPuzzleIndex];

    return (
        <div>
            {currentPuzzle ? (
                <Puzzle puzzleId={currentPuzzle.id} onPuzzleSolved={handleNextPuzzle} />
            ) : (
                <p>Loading puzzle...</p>
            )}
        </div>
    );
};

export default PuzzlePage;
