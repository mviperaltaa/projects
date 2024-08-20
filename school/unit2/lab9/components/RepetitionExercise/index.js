import React, { useState } from 'react';

function RepetitionExercise({ name }) {
  const [repetitionCount, setRepetitionCount] = useState(0); 
  const handleIncreaseRepetition = () => {
    setRepetitionCount(repetitionCount + 1);
  };


  const handleResetRepetition = () => {
    setRepetitionCount(0);
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>Repetition Count: {repetitionCount.toString().padStart(2, '0')}</p>
      <button onClick={handleIncreaseRepetition}>Increase Repetition</button>
      <button onClick={handleResetRepetition}>Reset Repetition Count</button>
    </div>
  );
}

export default RepetitionExercise;