import React from 'react';
import Leaderboard from '../components/Leaderboard';

function LeaderboardPage() {
  const teams = [
    { name: 'Team A' },
    { name: 'Team B' },
    { name: 'Team C' },
  ]; // Replace with actual data from Firebase

  return (
    <div>
      <h1>Leaderboard</h1>
      <Leaderboard teams={teams} />
    </div>
  );
}

export default LeaderboardPage;
