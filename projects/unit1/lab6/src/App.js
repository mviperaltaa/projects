import './App.css';
import React, { useState } from 'react';
import RepetitionExercise from './components/RepetitionExercise';
import DurationExercise from './components/DurationExercise';
import RunningExercise from './components/RunningExercise'; 

function App() {
  const [selectedExercise, setSelectedExercise] = useState(null);

  const handleMenuClick = (exercise) => {
    setSelectedExercise(exercise);
  };

  const handleBackToMenu = () => {
    setSelectedExercise(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Exercise Menu</h1>
        <ul>
          <li onClick={() => handleMenuClick('push-ups')}>Push-ups</li>
          <li onClick={() => handleMenuClick('sit-ups')}>Sit-ups</li>
          <li onClick={() => handleMenuClick('cycling')}>Cycling</li>
          <li onClick={() => handleMenuClick('jumping jacks')}>Jumping Jacks</li>
          <li onClick={() => handleMenuClick('running')}>Running</li>
        </ul>
      </header>
      
      {selectedExercise ? (
        <div>
          {selectedExercise === 'push-ups' || selectedExercise === 'sit-ups' ? (
            <RepetitionExercise name={selectedExercise} />
          ) : selectedExercise === 'cycling' || selectedExercise === 'jumping jacks' ? (
            <DurationExercise name={selectedExercise} />
          ) : selectedExercise === 'running' ? (
            <RunningExercise name="Running" setSelectedExercise={handleBackToMenu} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default App;