import React from 'react';
import Leaderboard from '../components/Leaderboard';
import '../styles/LeaderboardPage.css'

function LeaderboardPage() {
  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <p>Congratulations! you finished your tour around the world. You can find your rank here.</p>
      <Leaderboard />
    </div>
  );
}

export default LeaderboardPage;
