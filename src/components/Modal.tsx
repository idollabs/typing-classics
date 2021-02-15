import React from 'react';
import { useTyping } from '../state/context';

export const Modal = () => {
  const {
    state: { timersRunning },
  } = useTyping();

  return (
    <div className="modal">{timersRunning ? '' : 'Start typing to begin!'}</div>
  );
};
