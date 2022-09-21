export const bubbleSort = (elements) => {
  const newArray = [...elements];
  let unsortedLength = newArray.length;
  let isSorted = false;
  const steps = [];

  steps.push({
    state: newArray.map(value => ({ comparing: false, compared: false, value })),
    arrows: [],
    message: {
      en: 'Bubble Sort: we scan the array from left to right, comparing every pair of neighbours and swapping them when they are out of order.',
      es: 'Bubble Sort: recorremos el arreglo de izquierda a derecha comparando cada par de vecinos y los intercambiamos si están en el orden incorrecto.',
    },
  });

  while (!isSorted) {
    isSorted = true;
    for (let index = 0; index < unsortedLength - 1; index++) {
      const currentElement = newArray[index];
      const nextElement = newArray[index + 1];

      steps.push({
        state: newArray.map((value, i) => ({
          comparing: i === index || i === index + 1,
          compared: false,
          value,
        })),
        arrows: [index, index + 1],
        message: {
          en: `Comparing positions ${index} and ${index + 1} (${currentElement} and ${nextElement}).`,
          es: `Comparamos las posiciones ${index} y ${index + 1} (${currentElement} y ${nextElement}).`,
        },
      });

      if (currentElement > nextElement) {
        isSorted = false;
        newArray[index] = nextElement;
        newArray[index + 1] = currentElement;

        steps.push({
          state: newArray.map((value, i) => ({
            comparing: i === index || i === index + 1,
            compared: false,
            value,
          })),
          arrows: [index, index + 1],
          message: {
            en: `${currentElement} > ${nextElement}: out of order, we swap them.`,
            es: `${currentElement} > ${nextElement}: están en el orden incorrecto, los intercambiamos.`,
          },
        });
      }
    }
    unsortedLength = unsortedLength - 1;
  }

  steps.push({
    state: newArray.map(value => ({ comparing: false, compared: true, value })),
    arrows: [],
    message: {
      en: 'Array sorted! Bubble Sort performs O(n²) comparisons in the worst case.',
      es: '¡Arreglo ordenado! Bubble Sort hace O(n²) comparaciones en el peor caso.',
    },
  });

  return steps;
};
