import React from 'react';

import { wpm, accuracy } from '../utils';
import { useTyping } from '../state/context';

export const SpeedInfo = () => {
  const {
    state: { correctCharacters, allCharacters, timerSeconds, autoPauseSeconds },
    stopTimers,
    onReset,
  } = useTyping();
  console.log(
    'character: ',
    correctCharacters,
    'charVanillia: ',
    allCharacters,
    'seconds:',
    timerSeconds,
    'auto pause:',
    autoPauseSeconds
  );
  return (
    <div className="typing-speed">
      Typing speed
      <div>Time: {timerSeconds} sec</div>
      <div>WPM: {wpm(correctCharacters, timerSeconds)}</div>
      <div>Correct characters: {correctCharacters}</div>
      <div>Accuracy: {accuracy(allCharacters, correctCharacters)}%</div>
      <button onClick={stopTimers}>Pause</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};
