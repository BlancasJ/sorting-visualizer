export const generateRandomArray = (length, min, max) => {
  const array = Array.from({ length }).fill(0);
  const randomArray = array.map(() => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  });
  return randomArray;
};
