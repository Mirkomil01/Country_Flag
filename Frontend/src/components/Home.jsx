import React, { useState } from 'react';

export default function Home({ onStart, onShowLeaderboard }) {
  const [name, setName] = useState('');

  const startGame = () => {
    if (!name.trim()) {
      alert('Iltimos, ismingizni kiriting');
      return;
    }
    onStart(name.trim());
  };

  return (
    <div className="screen container">
      <h1 className="title">Davlat Poytaxtlari O'yini</h1>
      <input
        className="input"
        type="text"
        placeholder="Ismingizni kiriting"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="button primary-button" onClick={startGame}>
        O'yinni boshlash
      </button>
      <button className="button secondary-button" onClick={onShowLeaderboard}>
        Natijalar
      </button>
    </div>
  );
}
