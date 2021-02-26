import { useRef } from 'react';
import { useTyping } from '../state/context';

export const CharacterRenderer = () => {
  const {
    state: { text, input },
  } = useTyping();

  const charRefs = useRef(new Array(text.length));

  const handleSlider = () => {
    if (input.length - 1 >= 0 && input.length <= text.length) {
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
    <div className="characterRenderer">
      {text.map(({ id, char }) => {
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
