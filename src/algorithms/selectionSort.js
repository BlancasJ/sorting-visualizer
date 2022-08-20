const findSmallestIndex = (array) => {
  const smallest = array.reduce((a, b) => Math.min(a, b));
  return array.indexOf(smallest);
}

export const selectionSort = (elements) => {
  const originalArray = [...elements];
  const length = originalArray.length;
  const arrayStates = [];

  const newArray = [];
  for (let index = 0; index < length; index ++) {
    const smallestIndex = findSmallestIndex(originalArray);
    const [smallestValue] = originalArray.splice(smallestIndex, 1);
    newArray.push(smallestValue);
    arrayStates.push([
      ...newArray.map((value, i, arr) => ({
        comparing: i === arr.length - 1,
        compared: false,
        value,
      })),
      ...originalArray.map((value) => ({
        comparing: false,
        compared: false,
        value,
      }))
    ]);
  }

  arrayStates.push(newArray.map((value, i) => {
    return ({
      comparing: false,
      compared: true,
      value,
    });
  }));

  return arrayStates;
};
