import React, { useState, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { db } from '../firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';  // Assuming react-router-dom is used

const PlayerForm = () => {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const { setTeamToken, shufflePuzzles } = useContext(GameContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const teamToken = uuidv4();  // Generate unique token for team
        setTeamToken(teamToken);     // Save token in global context
        shufflePuzzles();            // Shuffle the puzzle list for the team

        // Save team info to Firestore
        await setDoc(doc(db, 'teams', teamToken), {
            player1,
            player2,
            teamToken,
            puzzlesSolved: 0,       // Start with 0 puzzles solved
            timestamp: serverTimestamp()
        });

        navigate('/puzzle');  // Redirect to the puzzle page
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Player 1 Name"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Player 2 Name"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                required
            />
            <button type="submit">Start Game</button>
        </form>
    );
};

export default PlayerForm;
