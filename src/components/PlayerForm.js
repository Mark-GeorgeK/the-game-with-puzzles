import React, { useState, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { db } from '../firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const PlayerForm = () => {
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const { teamToken, setTeamToken, teamName, setTeamName, shufflePuzzles } = useContext(GameContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const generatedToken = uuidv4();
        setTeamToken(generatedToken);
        setTeamName(`${player1} - ${player2}`);
        shufflePuzzles();

        await setDoc(doc(db, 'teams', generatedToken), {
            player1,
            player2,
            generatedToken,
            puzzlesSolved: 0,
            timestamp: serverTimestamp()
        });
    };

    return (
        <>
            {teamToken ? (
                <div className="form-container">
                    <span style={{fontFamily: 'monospace', fontSize: 'large'}}>{teamName}</span>
                    <p className="note">Hit Play to start your journey.</p>
                    <button type="button" onClick={() => navigate('/puzzle')}>Play</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="form-container">
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
                    <button type="submit">Register</button>
                </form>
            )}
        </>
    );
};

export default PlayerForm;
