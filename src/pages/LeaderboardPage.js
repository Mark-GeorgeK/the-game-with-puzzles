import React from 'react';
import Leaderboard from '../components/Leaderboard';
import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import '../styles/LeaderboardPage.css'

function LeaderboardPage() {
  const { teamName } = useContext(GameContext);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Tour Complete</h2>
      <p>Congratulations {teamName}! You finished your tour around the world.</p>
      {/* <Leaderboard /> */}
    </div>
  );
}

export default LeaderboardPage;
