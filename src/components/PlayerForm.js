import React, { useState } from 'react';

function PlayerForm({ onStartGame }) {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (player1 && player2) {
      onStartGame(player1, player2);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Player 1 Name" 
        value={player1} 
        onChange={(e) => setPlayer1(e.target.value)} 
        // required 
      />
      <input 
        type="text" 
        placeholder="Player 2 Name" 
        value={player2} 
        onChange={(e) => setPlayer2(e.target.value)} 
        // required 
      />
      <button type="submit">Start Game</button>
    </form>
  );
}

export default PlayerForm;
