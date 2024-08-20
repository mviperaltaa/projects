import React, { useState, useEffect } from 'react';

function DurationExercise({ name }) {
  const [timer, setTimer] = useState(0); 
  const [isRunning, setIsRunning] = useState(false); 
  const startTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimer(0);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>Timer: {formatTime(timer)}</p>
      {!isRunning ? <button onClick={startTimer}>Start Timer</button> : <button onClick={resetTimer}>Stop Timer</button>}
    </div>
  );
}

export default DurationExercise;