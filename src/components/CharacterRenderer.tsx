import React, { useRef } from 'react';
import { useTyping } from '../state/context';

export const CharacterRenderer = () => {
  const {
    state: { text, input },
  } = useTyping();

  const charRef = useRef();

  return (
    <div className='characterRenderer'>
      {text.split('').map((s, i) => {
        let color = '';
        if (i < input.length) {
          color = s === input[i] ? 'green' : 'red';
        }

        return (
          <>
            <span key={`${s}_${i}`} className={color}>
              {s}
            </span>
          </>
        );
      })}
    </div>
  );
};
