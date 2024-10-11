import React from 'react';

function Leaderboard({ teams }) {
  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>
            {team.name} - Rank: {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
