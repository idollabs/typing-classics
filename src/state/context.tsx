import React, {
  createContext,
  FunctionComponent,
  useReducer,
  useContext,
  Dispatch,
  useEffect,
  useCallback,
} from 'react';

import { initialState, reducer, ActionTypes, Action, State } from './state';

export const typingContext = createContext<[State, Dispatch<Action<any>>]>([
  initialState,
  () => {},
]);

export const TypingProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <typingContext.Provider value={[state, dispatch]}>
      {children}
    </typingContext.Provider>
  );
};

let newTimerInterval: any = null;
let newAutoPauseTimerInterval: any = null;
let timersStarted: boolean = false;

export const useTyping = () => {
  const [state, dispatch] = useContext(typingContext);
  console.log('state: ', state);

  const onInput = (value: string) => {
    dispatch({ type: ActionTypes.AUTO_PAUSE_TIMER_RESET });

    if (!state.timersRunning) {
      if (!timersStarted) {
        startTimer();
        startAutoPauseTimer();
        timersStarted = true;
        console.log('timers running: ', state.timersRunning);
        console.log('being called');
        console.log('time started', timersStarted);
      }
    }
    if (state.input.length >= state.text.length - 1 && state.timerInterval) {
      stopTimers();
    }
    dispatch({ type: ActionTypes.CHANGE_INPUT, payload: value });
    dispatch({ type: ActionTypes.COUNT_CHAR, payload: value });
  };

  const startTimer = () => {
    newTimerInterval = setInterval(
      () => dispatch({ type: ActionTypes.TIMER_INCREMENT }),
      1000
    );
    // dispatch({ type: ActionTypes.SET_TIMER, payload: timerInterval });
  };

  const startAutoPauseTimer = () => {
    newAutoPauseTimerInterval = setInterval(
      () => dispatch({ type: ActionTypes.AUTO_PAUSE_TIMER_INCREMENT }),
      1000
    );
  };

  const stopTimers = useCallback(() => {
    clearInterval(newTimerInterval);
    clearInterval(newAutoPauseTimerInterval);
    dispatch({ type: ActionTypes.STOP_TIMERS });
    console.log(
      'timers stopped',
      'newtimerint',
      newTimerInterval,
      'newautopause',
      newAutoPauseTimerInterval
    );
    timersStarted = false;
  }, [dispatch]);

  console.log(
    'test state',
    state.autoPauseTimerInterval,
    state.autoPauseSeconds,
    'timer seconds',
    state.timerSeconds
  );

  const onReset = () => {
    stopTimers();
    dispatch({ type: ActionTypes.CHANGE_INPUT, payload: '' });
    dispatch({ type: ActionTypes.COUNT_CHAR, payload: '' });
    dispatch({ type: ActionTypes.TIMER_RESET, payload: '' });
    dispatch({ type: ActionTypes.AUTO_PAUSE_TIMER_RESET, payload: '' });
  };

  const autoPauseTime = state.autoPauseSeconds >= 5;

  useEffect(() => {
    stopTimers();
  }, [autoPauseTime, stopTimers]);

  return { state, onInput, stopTimers, onReset };
};
