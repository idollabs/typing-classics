import React, { useRef } from 'react';
import { useTyping } from '../state/context';
import testText from '../testText.json';

export const CharacterRenderer = () => {
  const {
    state: { text, input }, //text state will replace testText
  } = useTyping();

  return (
    <div className='characterRenderer'>
      {testText.map((props) => {
        const { id, char } = props;

        let color = '';
        if (id < input.length) {
          color = char === input[id] ? 'green' : 'red';
        }

        return (
          <span key={id} className={color}>
            {char}
          </span>
        );
      })}
    </div>
  );
};
