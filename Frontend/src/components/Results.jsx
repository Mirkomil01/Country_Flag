// src/components/Results.jsx
import React, { useEffect } from 'react';

export default function Results({ playerName, score, onPlayAgain, onViewLeaderboard }) {
  useEffect(() => {
    const results = JSON.parse(localStorage.getItem('results') || '{}');
    if (!results[playerName] || results[playerName] < score) {
      results[playerName] = score;
      localStorage.setItem('results', JSON.stringify(results));
    }
  }, [playerName, score]);

  const getFeedback = () => {
    if (score === 10) return "Zo'r! Siz juda aqllisiz!";
    if (score >= 7) return 'Yaxshi! Ancha yaxshi o‘ynadingiz.';
    if (score >= 5) return "Yomon emas, yana urinib ko‘ring!";
    return "Qaytadan harakat qiling!";
  };

  return (
    <div className="screen container">
      <h2 className="title">O'yin tugadi!</h2>
      <p className="final-score">Ballingiz: {score} / 10</p>
      <p className="feedback">{getFeedback()}</p>
      <button className="button primary-button" onClick={onPlayAgain}>
        Yana o‘ynash
      </button>
      <button className="button secondary-button" onClick={onViewLeaderboard}>
        Natijalar
      </button>
    </div>
  );
}
