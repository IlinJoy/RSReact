export const getRandomNumber = (min: number = 0, max: number = 10) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomItemFromArray = <T>(array: T[]) => {
  return array[getRandomNumber(0, array.length - 1)];
};
