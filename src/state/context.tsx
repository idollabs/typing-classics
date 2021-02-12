import React, {
  createContext,
  FunctionComponent,
  useReducer,
  useContext,
  Dispatch,
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

export const useTyping = () => {
  const [state, dispatch] = useContext(typingContext);
  console.log('state: ', state);

  //Pause if away from keyboard
  // if (state.autoPauseTimer === 5) {
  //   clearInterval(state.pauseTimerId);
  //   dispatch({ type: ActionTypes.SET_PAUSE_TIMER });

  //   clearInterval(state.timerId);
  //   dispatch({ type: ActionTypes.SET_TIMER });
  // }

  const onInput = (value: string) => {
    dispatch({ type: ActionTypes.AUTO_PAUSE_TIMER_RESET });

    if (!state.timerId) {
      startTimer();
      startAutoPauseTimer();
    }
    if (state.input.length >= state.text.length - 1 && state.timerId) {
      stopTimer();
    }
    dispatch({ type: ActionTypes.CHANGE_INPUT, payload: value });
    dispatch({ type: ActionTypes.COUNT_CHAR, payload: value });
  };

  const startTimer = () => {
    const timerId = setInterval(
      () => dispatch({ type: ActionTypes.TICK }),
      1000
    );
    dispatch({ type: ActionTypes.SET_TIMER, payload: timerId });
  };

  const startAutoPauseTimer = () => {
    const pauseTimerId = setInterval(
      () => dispatch({ type: ActionTypes.AUTO_PAUSE_TIMER_INCREMENT }),
      1000
    );
    dispatch({ type: ActionTypes.SET_PAUSE_TIMER, payload: pauseTimerId });
  };

  const stopTimer = () => {
    clearInterval(state.timerId);
    dispatch({ type: ActionTypes.SET_TIMER });
  };

  const onReset = () => {
    stopTimer();
    dispatch({ type: ActionTypes.CHANGE_INPUT, payload: '' });
    dispatch({ type: ActionTypes.COUNT_CHAR, payload: '' });
    dispatch({ type: ActionTypes.TIMER_RESET, payload: '' });
  };

  return { state, onInput, stopTimer, onReset };
};
