import React from "react";

export default function GamesTable({ games }) {
  return (
    <table border="1" cellPadding="8" style={{ marginTop: '20px' }}>
      <thead>
        <tr>
          <th>Home Team</th>
          <th>Visitor Team</th>
          <th>Score</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {games.map((game, index) => (
          <tr key={index}>
            <td>{game.home_team.full_name}</td>
            <td>{game.visitor_team.full_name}</td>
            <td>{game.home_team_score} - {game.visitor_team_score}</td>
            <td>{game.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
