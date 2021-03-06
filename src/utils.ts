export const words = (char: number) => char / 5;

export const minutes = (seconds: number) => seconds / 60;

export const wpm = (words: number, minute: number) =>
  Math.round(words / minute) || 0;

export const countCorrectCharacters = (text: string, input: string) => {
  const textChar = text;
  const inputChar = input;

  return inputChar.split('').filter((char, index) => char === textChar[index])
    .length;
};

export const countTotalCharacters = (input: string) => {
  return input.length;
};

export const accuracy = (total: number, correct: number) =>
  Math.round((correct / total) * 100) || 0;
