import React, { FunctionComponent, useEffect, useCallback } from 'react';
import { useTyping } from '../state/context';

export const Preview: FunctionComponent = () => {
  const {
    state: { text, input, allCharacters },
  } = useTyping();

  const previewText = text.split('').map((s, i) => {
    const characterRef = React.createRef() as React.MutableRefObject<HTMLInputElement>;

    const handleSlider = useCallback(
      () =>
        characterRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        }),
      [characterRef]
    );

    let color = '';
    if (i < input.length) {
      color = s === input[i] ? 'green' : 'red';
    }

    // if (allCharacters === i) {
    //   handleSlider();
    //   console.log('handle slider');
    // }

    useEffect(() => {
      handleSlider();
    }, [allCharacters, handleSlider]);

    return (
      <>
        <span key={`${s}_${i}`} className={color} ref={characterRef}>
          {s}
        </span>
      </>
    );
  });

  return <div className='preview'>{previewText}</div>;
};
