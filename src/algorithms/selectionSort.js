export const selectionSort = (elements) => {
  const newArray = [...elements];
  const steps = [];
  const n = newArray.length;

  steps.push({
    state: newArray.map(value => ({ comparing: false, compared: false, value })),
    arrows: [],
    message: {
      en: 'Selection Sort: on each pass we find the smallest value in the unsorted part and move it to the start of that region.',
      es: 'Selection Sort: en cada pasada buscamos el valor mínimo del tramo sin ordenar y lo llevamos al inicio de ese tramo.',
    },
  });

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    steps.push({
      state: newArray.map((value, idx) => ({
        comparing: idx === i,
        compared: idx < i,
        value,
      })),
      arrows: [i],
      message: {
        en: `Looking for the minimum between positions ${i} and ${n - 1}. Initial candidate: ${newArray[i]}.`,
        es: `Buscamos el mínimo entre las posiciones ${i} y ${n - 1}. Candidato inicial: ${newArray[i]}.`,
      },
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        state: newArray.map((value, idx) => ({
          comparing: idx === j || idx === minIndex,
          compared: idx < i,
          value,
        })),
        arrows: [minIndex, j],
        message: {
          en: `Compare candidate ${newArray[minIndex]} (pos ${minIndex}) with ${newArray[j]} (pos ${j}).`,
          es: `Comparamos el candidato ${newArray[minIndex]} (pos ${minIndex}) con ${newArray[j]} (pos ${j}).`,
        },
      });

      if (newArray[j] < newArray[minIndex]) {
        minIndex = j;
        steps.push({
          state: newArray.map((value, idx) => ({
            comparing: idx === minIndex,
            compared: idx < i,
            value,
          })),
          arrows: [minIndex],
          message: {
            en: `${newArray[j]} is smaller: new minimum candidate at position ${minIndex}.`,
            es: `${newArray[j]} es menor: nuevo candidato a mínimo en la posición ${minIndex}.`,
          },
        });
      }
    }

    if (minIndex !== i) {
      const tmp = newArray[i];
      newArray[i] = newArray[minIndex];
      newArray[minIndex] = tmp;

      steps.push({
        state: newArray.map((value, idx) => ({
          comparing: idx === i || idx === minIndex,
          compared: idx < i,
          value,
        })),
        arrows: [i, minIndex],
        message: {
          en: `Swap positions ${i} and ${minIndex} to bring the minimum to the front of the unsorted region.`,
          es: `Intercambiamos las posiciones ${i} y ${minIndex} para llevar el mínimo al inicio del tramo sin ordenar.`,
        },
      });
    } else {
      steps.push({
        state: newArray.map((value, idx) => ({
          comparing: idx === i,
          compared: idx < i,
          value,
        })),
        arrows: [i],
        message: {
          en: `The minimum was already at position ${i}, no swap needed.`,
          es: `El mínimo ya estaba en la posición ${i}, no hace falta intercambiar.`,
        },
      });
    }
  }

  steps.push({
    state: newArray.map(value => ({ comparing: false, compared: true, value })),
    arrows: [],
    message: {
      en: 'Array sorted! Selection Sort always does O(n²) comparisons but very few swaps.',
      es: '¡Arreglo ordenado! Selection Sort hace siempre O(n²) comparaciones, pero muy pocos intercambios.',
    },
  });

  return steps;
};
