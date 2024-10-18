import React from 'react';
import Leaderboard from '../components/Leaderboard';
import '../styles/LeaderboardPage.css'

function LeaderboardPage() {
  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <Leaderboard />
    </div>
  );
}

export default LeaderboardPage;
