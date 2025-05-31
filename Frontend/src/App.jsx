import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Home from './components/Home';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Leaderboard from './components/Leaderboard';

import './App.css';

function App() {
  // Davlatlar ro'yxati
  const [countries, setCountries] = useState([]);
  
  // O'yin holati: 'home', 'quiz', 'results', 'leaderboard'
  const [gameState, setGameState] = useState('home');
  
  // O'yinchi ismi
  const [playerName, setPlayerName] = useState('');
  
  // O'yinchi ballari
  const [score, setScore] = useState(0);

  // Komponent yuklanganda davlatlarni olish
  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get('http://localhost:4000/api/countries');
        setCountries(response.data);
      } catch (error) {
        alert('Davlatlarni olishda xatolik yuz berdi.');
        console.error(error);
      }
    }
    fetchCountries();
  }, []);

  return (
    <div className="app-container">
      {gameState === 'home' && (
        <Home
          onStart={(name) => {
            setPlayerName(name);
            setScore(0);
            setGameState('quiz');
          }}
          onShowLeaderboard={() => setGameState('leaderboard')}
        />
      )}

      {gameState === 'quiz' && (
        <Quiz
          countries={countries}
          onFinish={(finalScore) => {
            setScore(finalScore);
            setGameState('results');
          }}
        />
      )}

      {gameState === 'results' && (
        <Results
          playerName={playerName}
          score={score}
          onPlayAgain={() => setGameState('home')}
          onViewLeaderboard={() => setGameState('leaderboard')}
        />
      )}

      {gameState === 'leaderboard' && (
        <Leaderboard onBack={() => setGameState('home')} />
      )}
    </div>
  );
}

export default App;
