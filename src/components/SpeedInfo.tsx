import React from 'react';

import { wpm, accuracy } from '../utils';
import { useTyping } from '../state/context';

export const SpeedInfo = () => {
  const {
    state: { correctCharacters, allCharacters, seconds, autoPauseTimer },
    stopTimer,
    onReset,
  } = useTyping();
  console.log(
    'character: ',
    correctCharacters,
    'charVanillia: ',
    allCharacters,
    'seconds:',
    seconds,
    'auto pause:',
    autoPauseTimer
  );
  return (
    <div className="typing-speed">
      Typing speed
      <div>Time: {seconds} sec</div>
      <div>WPM: {wpm(correctCharacters, seconds)}</div>
      <div>Correct characters: {correctCharacters}</div>
      <div>Accuracy: {accuracy(allCharacters, correctCharacters)}%</div>
      <button onClick={stopTimer}>Pause</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};
