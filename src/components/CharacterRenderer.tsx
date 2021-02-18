import React, { useRef } from 'react';
import { useTyping } from '../state/context';
import testText from '../testText.json';

export const CharacterRenderer = () => {
  const {
    state: { text, input }, //text state will replace testText
  } = useTyping();

  const charRefs = useRef(new Array(testText.length));

  const handleSlider = () => {
    if (input.length - 1 >= 0 && input.length <= testText.length) {
      charRefs.current[input.length - 1].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (input) {
    handleSlider();
  }

  return (
    <div className='characterRenderer'>
      {testText.map(({ id, char }) => {
        let color = '';
        if (id < input.length) {
          color = char === input[id] ? 'green' : 'red';
        }

        return (
          <span
            key={id}
            className={color}
            ref={(element) => {
              charRefs.current[id] = element;
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};
