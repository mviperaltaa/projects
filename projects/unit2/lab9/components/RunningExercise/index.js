import React, { useState } from 'react';

const RunningExercise = ({ name, setSelectedExercise }) => {
  const [laps, setLaps] = useState([]);
  const [timer, setTimer] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    setIsRunning(true);
    setTimer(setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1);
    }, 1000));
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timer);
  };

  const recordLap = () => {
    const currentTime = new Date().toLocaleTimeString();
    setLaps([...laps, currentTime]);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(timer);
    setTimeElapsed(0);
    setLaps([]);
  };

  const backToMenu = () => {
    setIsRunning(false);
    clearInterval(timer);
    setTimeElapsed(0);
    setLaps([]);
    setSelectedExercise(null);
  };

  return (
    <div>
      <h2>{name}</h2>
      <div>
        <p>Time Elapsed: {timeElapsed} seconds</p>
        <button onClick={isRunning ? stopTimer : startTimer}>{isRunning ? 'Stop' : 'Start'}</button>
        <button onClick={recordLap} disabled={!isRunning}>Record Lap</button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={backToMenu}>Back to Menu</button>
      </div>
      <div>
        <h3>Laps</h3>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>{lap}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RunningExercise;