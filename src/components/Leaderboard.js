import React from 'react';
import '../styles/leaderboard.css';

function Leaderboard({ teams }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{team.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
