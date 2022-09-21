const snapshot = (arr, comparingSet, comparedSet) => arr.map((value, index) => ({
  comparing: comparingSet.has(index),
  compared: comparedSet.has(index),
  value,
}));

const partition = (arr, low, high, steps) => {
  const pivot = arr[high];

  steps.push({
    state: snapshot(arr, new Set(), new Set([high])),
    arrows: [high],
    message: {
      en: `Pick pivot = ${pivot} at position ${high}. We will move smaller values to its left.`,
      es: `Elegimos pivote = ${pivot} en la posición ${high}. Moveremos los menores a su izquierda.`,
    },
  });

  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    steps.push({
      state: snapshot(arr, new Set([j]), new Set([high])),
      arrows: [j, high],
      message: {
        en: `Compare ${arr[j]} (pos ${j}) with pivot ${pivot}.`,
        es: `Comparamos ${arr[j]} (pos ${j}) con el pivote ${pivot}.`,
      },
    });

    if (arr[j] < pivot) {
      i++;
      if (i !== j) {
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
        steps.push({
          state: snapshot(arr, new Set([i, j]), new Set([high])),
          arrows: [i, j],
          message: {
            en: `${arr[i]} < ${pivot}: swap it into the "smaller than pivot" zone at position ${i}.`,
            es: `${arr[i]} < ${pivot}: lo movemos a la zona "menor que el pivote" en la posición ${i}.`,
          },
        });
      } else {
        steps.push({
          state: snapshot(arr, new Set([i]), new Set([high])),
          arrows: [i],
          message: {
            en: `${arr[i]} < ${pivot}: it already sits at the boundary (pos ${i}).`,
            es: `${arr[i]} < ${pivot}: ya estaba en la frontera (pos ${i}).`,
          },
        });
      }
    }
  }

  const pivotFinal = i + 1;
  if (pivotFinal !== high) {
    const tmp = arr[pivotFinal];
    arr[pivotFinal] = arr[high];
    arr[high] = tmp;
  }
  steps.push({
    state: snapshot(arr, new Set(), new Set([pivotFinal])),
    arrows: [pivotFinal],
    message: {
      en: `Place the pivot at position ${pivotFinal}: every value on its left is smaller, every value on its right is greater or equal.`,
      es: `Colocamos el pivote en la posición ${pivotFinal}: todo a su izquierda es menor y todo a su derecha es mayor o igual.`,
    },
  });

  return pivotFinal;
};

const recurse = (arr, low, high, steps) => {
  if (low >= high) return;
  const pi = partition(arr, low, high, steps);
  recurse(arr, low, pi - 1, steps);
  recurse(arr, pi + 1, high, steps);
};

export const quickSort = (array) => {
  const newArray = [...array];
  const steps = [];

  steps.push({
    state: newArray.map(value => ({ comparing: false, compared: false, value })),
    arrows: [],
    message: {
      en: 'Quick Sort: pick a pivot, partition the array so smaller values sit on the left and larger on the right, then recursively sort each side.',
      es: 'Quick Sort: escogemos un pivote, reorganizamos para que los menores queden a su izquierda y los mayores a su derecha, y luego ordenamos cada lado recursivamente.',
    },
  });

  recurse(newArray, 0, newArray.length - 1, steps);

  steps.push({
    state: newArray.map(value => ({ comparing: false, compared: true, value })),
    arrows: [],
    message: {
      en: 'Array sorted! Quick Sort averages O(n log n) and usually beats Merge Sort in practice, though its worst case is O(n²).',
      es: '¡Arreglo ordenado! Quick Sort promedia O(n log n) y suele ganarle a Merge Sort en la práctica, aunque su peor caso es O(n²).',
    },
  });

  return steps;
};
