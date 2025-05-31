import React from "react";

export default function Leaderboard({ onBack }) {
  const results = JSON.parse(localStorage.getItem("results") || "{}");

  const sortedResults = Object.entries(results).sort((a, b) => b[1] - a[1]);

  return (
    <div className="screen container">
      <h2 className="title">Eng yaxshi natijalar</h2>
      <div className="leaderboard-list">
        {sortedResults.length === 0 && <p>Hali hech kim o'ynamagan.</p>}
        {sortedResults.map(([name, score], index) => (
          <div key={name} className="leaderboard-item">
            <span>
              {index + 1}. {name}
            </span>
            <span>{score} ball</span>
          </div>
        ))}
      </div>
      <button className="button primary-button" onClick={onBack}>
        Orqaga
      </button>
    </div>
  );
}
