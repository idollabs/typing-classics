export const words = (char: number) => char / 5;

export const minutes = (seconds: number) => seconds / 60;

export const wpm = (words: number, minute: number) =>
  Math.round(words / minute) || 0;

export const countCorrectCharacters = (text: string, input: string) => {
  const tc = text;
  const ic = input;
  return ic.split('').filter((c, i) => c === tc[i]).length;
};

export const countTotalCharacters = (text: string, input: string) => {
  return input.length;
};

export const accuracy = (total: number, correct: number) =>
  Math.round((correct / total) * 100) || 0;
