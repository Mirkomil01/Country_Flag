import React, { useState, useEffect } from 'react';

export default function Quiz({ countries, onFinish }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedOption, setSelectedOption] = useState(null);
  const [disableOptions, setDisableOptions] = useState(false);

  useEffect(() => {
    if (countries.length > 0) {
      generateOptions(questionIndex);
    }
    // eslint-disable-next-line
  }, [countries, questionIndex]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
    }
    if (timeLeft > 0 && disableOptions === false) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [timeLeft, disableOptions]);

  function generateOptions(index) {
    const correctCapital = countries[index].capital[0];
    const opts = new Set();
    opts.add(correctCapital);

    while (opts.size < 4) {
      const randomCapital =
        countries[Math.floor(Math.random() * countries.length)].capital[0];
      opts.add(randomCapital);
    }

    setOptions(shuffleArray([...opts]));
    setTimeLeft(15);
    setSelectedOption(null);
    setDisableOptions(false);
  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function handleAnswer(option) {
    if (disableOptions) return;
    setSelectedOption(option);
    setDisableOptions(true);
    if (option === countries[questionIndex].capital[0]) {
      setScore(score + 1);
    }
  }

  function handleNext() {
    if (questionIndex + 1 < 10) {
      setQuestionIndex(questionIndex + 1);
    } else {
      onFinish(score);
    }
  }

  if (countries.length === 0) {
    return <div>Yuklanmoqda...</div>;
  }

  const correctCapital = countries[questionIndex].capital[0];

  return (
    <div className="screen container">
      <div className="game-stats">
        <div className="stat">Savol: {questionIndex + 1} / 10</div>
        <div className="stat">Ball: {score}</div>
        <div className="stat" style={{ color: 'red' }}>
          Vaqt: {timeLeft}
        </div>
      </div>
      <div className="country-info">
        <img
          src={(countries[questionIndex].flags.svg || countries[questionIndex].flags.png).replace(
            'http://',
            'https://'
          )}
          alt="Bayroq"
          className="flag"
        />
        <h2 className="country-name">{countries[questionIndex].name.common}</h2>
        <p>Bu davlatning poytaxti qaysi?</p>
      </div>
      <div className="options">
        {options.map((opt) => {
          let className = 'option';
          if (disableOptions) {
            if (opt === correctCapital) className += ' correct';
            else if (opt === selectedOption) className += ' incorrect';
          }
          return (
            <button
              key={opt}
              className={className}
              disabled={disableOptions}
              onClick={() => handleAnswer(opt)}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {disableOptions && (
        <button className="button primary-button" onClick={handleNext}>
          Keyingi savol
        </button>
      )}
    </div>
  );
}
