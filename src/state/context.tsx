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

  const startTimer = useCallback(() => {
    newTimerInterval = setInterval(
      () => dispatch({ type: ActionTypes.TIMER_INCREMENT }),
      1000
    );
  }, [dispatch]);

  const startAutoPauseTimer = useCallback(() => {
    newAutoPauseTimerInterval = setInterval(
      () => dispatch({ type: ActionTypes.AUTO_PAUSE_TIMER_INCREMENT }),
      1000
    );
  }, [dispatch]);

  const stopTimers = useCallback(() => {
    clearInterval(newTimerInterval);
    clearInterval(newAutoPauseTimerInterval);
    dispatch({ type: ActionTypes.STOP_TIMERS });

    timersStarted = false;
  }, [dispatch]);

  const onInput = useCallback(
    (value: string) => {
      dispatch({ type: ActionTypes.AUTO_PAUSE_TIMER_RESET });

      if (!state.timersRunning) {
        if (!timersStarted) {
          startTimer();
          startAutoPauseTimer();
          timersStarted = true;
        }
      }
      if (state.input.length >= state.text.length - 1 && state.timerInterval) {
        stopTimers();
      }
      dispatch({ type: ActionTypes.CHANGE_INPUT, payload: value });
      dispatch({ type: ActionTypes.COUNT_CHAR, payload: value });
    },
    [
      dispatch,
      state.input.length,
      state.text.length,
      state.timerInterval,
      state.timersRunning,
      startAutoPauseTimer,
      startTimer,
      stopTimers,
    ]
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
