export const bubbleSort = (elements) => {
  const newArray = [...elements];
  let unsortedLength = newArray.length;
  let isSorted = false;
  const arrayStates = [];

  while (!isSorted) {
    isSorted = true;
    for (let index = 0; index < unsortedLength; index++) {
      const currentElement = newArray[index];
      const nextElement = newArray[index + 1];

      if (currentElement > nextElement) {
        isSorted = false;
        newArray[index] = nextElement;
        newArray[index + 1] = currentElement;

        arrayStates.push(newArray.map((value, i) => ({
          comparing: i === index || i === index + 1,
          compared: false,
          value,
        })));
      }
    }
    unsortedLength = unsortedLength - 1;
  }

  arrayStates.push(newArray.map(value => ({
    comparing: false,
    compared: true,
    value,
  })));

  return arrayStates;
};
