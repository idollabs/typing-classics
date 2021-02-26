import { wpm, accuracy, words, minutes } from '../utils';
import { useTyping } from '../state/context';

export const SpeedInfo = () => {
  const {
    state: { correctCharacters, allCharacters, timerSeconds },
    stopTimers,
    onReset,
  } = useTyping();

  return (
    <div className="typing-speed">
      Typing speed
      <div>Time: {timerSeconds} sec</div>
      <div>WPM: {wpm(words(correctCharacters), minutes(timerSeconds))}</div>
      <div>All characters: {allCharacters}</div>
      <div>Correct characters: {correctCharacters}</div>
      <div>Accuracy: {accuracy(allCharacters, correctCharacters)}%</div>
      <button onClick={stopTimers}>Pause</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};
