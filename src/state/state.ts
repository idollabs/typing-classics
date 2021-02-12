import { countCorrectCharacters, countTotalCharacters } from '../utils';

export interface State {
  text: string;
  input: string;
  correctCharacters: number;
  allCharacters: number;
  seconds: number;
  timerId?: number;
  autoPauseTimer: number;
  pauseTimerId?: number;
}

export const initialState: State = {
  text:
    'Just some typing speed initial state words. Add some other text later, ok?',
  input: '',
  correctCharacters: 0,
  allCharacters: 0,
  seconds: 0,
  timerId: undefined,
  autoPauseTimer: 0,
  pauseTimerId: undefined,
};

export enum ActionTypes {
  CHANGE_INPUT,
  COUNT_CHAR,
  SET_TIMER,
  SET_PAUSE_TIMER,
  TICK,
  TIMER_RESET,
  AUTO_PAUSE_TIMER_INCREMENT,
  AUTO_PAUSE_TIMER_RESET,
}

export interface Action<T> {
  type: ActionTypes;
  payload?: T;
}

type Transducer = (state: State, action: Action<any>) => State;
type Reducer<T = any> = (state: State, payload?: T) => State;

export const changeInput: Reducer<string> = (state, input = '') => ({
  ...state,
  input,
  correctCharacters: countCorrectCharacters(state.text, input),
});

export const countCharacters: Reducer<string> = (state, input = '') => ({
  ...state,
  input,
  allCharacters: countTotalCharacters(state.text, input),
});

export const setTimer: Reducer<number> = (state, timerId) => ({
  ...state,
  timerId,
});

export const tick: Reducer = (state) => ({
  ...state,
  seconds: state.seconds + 1,
});

export const setPauseTimerId: Reducer<number> = (state, pauseTimerId) => ({
  ...state,
  pauseTimerId,
});

export const autoPauseTimerIncrement: Reducer = (state) => ({
  ...state,
  autoPauseTimer: state.autoPauseTimer + 1,
  // state.autoPauseTimer === 8
  //   ? (state.autoPauseTimer = 0)
  //   : state.autoPauseTimer + 1,
});

export const timerReset: Reducer<number> = (state) => ({
  ...state,
  seconds: 0,
});
export const autoPauseTimerReset: Reducer<number> = (state) => ({
  ...state,
  autoPauseTimer: 0,
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
    case ActionTypes.TICK:
      return tick(state);
    case ActionTypes.AUTO_PAUSE_TIMER_INCREMENT:
      return autoPauseTimerIncrement(state);
    case ActionTypes.TIMER_RESET:
      return timerReset(state);
    case ActionTypes.AUTO_PAUSE_TIMER_RESET:
      return autoPauseTimerReset(state);
    default:
      return state;
  }
};
