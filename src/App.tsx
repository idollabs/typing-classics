import React from 'react';

import { TypingProvider } from './state/context';
import { UserInput } from './components/UserInput';
import { CharacterRenderer } from './components/CharacterRenderer';
import { SpeedInfo } from './components/SpeedInfo';
import { Modal } from './components/Modal';

export const App = () => (
  <TypingProvider>
    <h1>Typing Speed Test</h1>
    <Modal />
    <div className='container'>
      <div className='typing-test'>
        <CharacterRenderer />

        <UserInput />
      </div>
      <SpeedInfo />
    </div>
  </TypingProvider>
);
