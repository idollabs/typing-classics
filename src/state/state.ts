import { countCorrectCharacters, countTotalCharacters } from '../utils';
import testText from '../testText.json';

const textOrigin = testText;

const extractText = (): string => {
  let textString = '';

  textOrigin.map(({ char }) => {
    return (textString += char);
  });

  return textString;
};

type objectIdChar = { id: number; char: string };

export interface State {
  text: Array<objectIdChar>;
  helperText: string;
  input: string;
  correctCharacters: number;
  allCharacters: number;
  timerSeconds: number;
  timerInterval?: number;
  autoPauseSeconds: number;
  autoPauseTimerInterval?: number;
  timersRunning: boolean;
}

export const initialState: State = {
  text: textOrigin,
  helperText: extractText(),
  input: '',
  correctCharacters: 0,
  allCharacters: 0,
  timerSeconds: 0,
  timerInterval: 0,
  autoPauseSeconds: 0,
  autoPauseTimerInterval: 0,
  timersRunning: false,
};

export enum ActionTypes {
  CHANGE_INPUT,
  COUNT_CHAR,
  SET_TIMER,
  SET_PAUSE_TIMER,
  TIMER_INCREMENT,
  TIMER_RESET,
  AUTO_PAUSE_TIMER_INCREMENT,
  AUTO_PAUSE_TIMER_RESET,
  STOP_TIMERS,
  START_TIMERS,
}

export interface Action<T> {
  type: ActionTypes;
  payload?: T;
}

type Transducer = (state: State, action: Action<any>) => State;
type Reducer<T = any> = (state: State, payload?: T) => State;

const changeInput: Reducer<string> = (state, input = '') => ({
  ...state,
  input,
  correctCharacters: countCorrectCharacters(state.helperText, input),
  timersRunning: true,
});

const countCharacters: Reducer<string> = (state, input = '') => ({
  ...state,
  input,
  allCharacters: countTotalCharacters(input),
});

const setTimer: Reducer<number> = (state, timerInterval) => {
  console.log('timerInterval', state, timerInterval);
  const newState = {
    ...state,
    timerInterval,
  };
  console.log('newState', newState);
  return newState;
};

const timerIncrement: Reducer = (state) => ({
  ...state,
  timerSeconds: state.timerSeconds + 1,
});

export const setPauseTimerInterval: Reducer<number> = (
  state,
  pauseTimerInterval
) => ({
  ...state,
  pauseTimerInterval,
});

const autoPauseSecondsIncrement: Reducer = (state) => ({
  ...state,
  autoPauseSeconds: state.autoPauseSeconds + 1,
});

const timerReset: Reducer<number> = (state) => ({
  ...state,
  timerSeconds: 0,
});
const autoPauseSecondsReset: Reducer<number> = (state) => ({
  ...state,
  autoPauseSeconds: 0,
});

const startTimers: Reducer<boolean> = (state) => ({
  ...state,
  timersRunning: true,
});

const stopTimers: Reducer<boolean> = (state) => ({
  ...state,
  timersRunning: false,
});

export const reducer: Transducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_INPUT:
      return changeInput(state, action.payload);
    case ActionTypes.COUNT_CHAR:
      return countCharacters(state, action.payload);
    case ActionTypes.SET_TIMER:
      return setTimer(state, action.payload);
    case ActionTypes.SET_PAUSE_TIMER:
      return setTimer(state, action.payload);
    case ActionTypes.TIMER_INCREMENT:
      return timerIncrement(state);
    case ActionTypes.AUTO_PAUSE_TIMER_INCREMENT:
      return autoPauseSecondsIncrement(state);
    case ActionTypes.TIMER_RESET:
      return timerReset(state);
    case ActionTypes.AUTO_PAUSE_TIMER_RESET:
      return autoPauseSecondsReset(state);
    case ActionTypes.STOP_TIMERS:
      return stopTimers(state);
    case ActionTypes.START_TIMERS:
      return startTimers(state);

    default:
      return state;
  }
};
