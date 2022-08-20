export const insertionSort = (elements) => {
  const newArray = [...elements];
  const arrayStates = [];

  for (let index = 1; index < newArray.length; index ++) {
    let position = index;
    const temporalValue = newArray[index];

    while (position > 0 && newArray[position - 1] > temporalValue) {
      arrayStates.push(newArray.map((value, i) => {
        return ({
          comparing: i === position || i === position - 1,
          compared: false,
          value,
        });
      }));

      newArray[position] = newArray[position - 1];
      position = position - 1;
    }
    newArray[position] = temporalValue;
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
