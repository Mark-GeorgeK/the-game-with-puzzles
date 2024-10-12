import React, { useContext, useEffect } from 'react';
import { GameContext } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import Puzzle from '../components/Puzzle';
import { db } from '../firebaseConfig';
import { doc, updateDoc, increment } from 'firebase/firestore';

const PuzzlePage = () => {
    const { teamToken, currentPuzzleIndex, setCurrentPuzzleIndex, shuffledPuzzles } = useContext(GameContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (shuffledPuzzles.length === 0) {
            navigate('/'); // Redirect to home if no puzzles are available
        }
    }, [shuffledPuzzles, navigate]);

    const handleNextPuzzle = async () => {
        const nextIndex = currentPuzzleIndex + 1;

        const teamRef = doc(db, 'teams', teamToken);
        await updateDoc(teamRef, {
            puzzlesSolved: increment(1)
        });

        if (nextIndex >= shuffledPuzzles.length) {
            navigate('/leaderboard');
        } else {
            setCurrentPuzzleIndex(nextIndex);
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
