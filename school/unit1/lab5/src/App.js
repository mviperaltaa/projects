import './App.css';
import React, { useState } from 'react';
import RepetitionExercise from './components/RepetitionExercise';
import DurationExercise from './components/DurationExercise';

function App() {
  const [selectedExercise, setSelectedExercise] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Exercise Menu</h1>
        <ul>
          <li onClick={() => setSelectedExercise('push-ups')}>Push-ups</li>
          <li onClick={() => setSelectedExercise('sit-ups')}>Sit-ups</li>
          <li onClick={() => setSelectedExercise('cycling')}>Cycling</li>
          <li onClick={() => setSelectedExercise('jumping jacks')}>Jumping Jacks</li>
        </ul>
      </header>
      
      {selectedExercise && (
        <div>
          {selectedExercise === 'push-ups' || selectedExercise === 'sit-ups' ? (
            <RepetitionExercise name={selectedExercise} />
          ) : (
            <DurationExercise name={selectedExercise} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;