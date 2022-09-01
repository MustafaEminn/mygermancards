export const generateRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const generateRandomSixDigitNumber = () =>
  generateRandomNumber(100000, 999999);
