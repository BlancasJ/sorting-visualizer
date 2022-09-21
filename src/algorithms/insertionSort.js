export const insertionSort = (elements) => {
  const newArray = [...elements];
  const steps = [];

  steps.push({
    state: newArray.map(value => ({ comparing: false, compared: false, value })),
    arrows: [],
    message: {
      en: 'Insertion Sort: take each new value and, while it is smaller than its left neighbour, swap them so it slides into its correct place.',
      es: 'Insertion Sort: tomamos cada nuevo valor y, mientras sea menor que su vecino izquierdo, los intercambiamos para que baje a su posición correcta.',
    },
  });

  for (let i = 1; i < newArray.length; i++) {
    let j = i;

    steps.push({
      state: newArray.map((value, idx) => ({
        comparing: idx === i,
        compared: idx < i,
        value,
      })),
      arrows: [i],
      message: {
        en: `New value ${newArray[i]} enters the sorted region. We compare it with the neighbour on its left.`,
        es: `El nuevo valor ${newArray[i]} entra a la región ordenada. Lo comparamos con su vecino izquierdo.`,
      },
    });

    while (j > 0 && newArray[j - 1] > newArray[j]) {
      steps.push({
        state: newArray.map((value, idx) => ({
          comparing: idx === j || idx === j - 1,
          compared: idx < i && idx !== j && idx !== j - 1,
          value,
        })),
        arrows: [j - 1, j],
        message: {
          en: `${newArray[j - 1]} > ${newArray[j]}: swap the two bars so the smaller one moves left.`,
          es: `${newArray[j - 1]} > ${newArray[j]}: intercambiamos las dos barras para que la menor avance a la izquierda.`,
        },
      });

      const tmp = newArray[j];
      newArray[j] = newArray[j - 1];
      newArray[j - 1] = tmp;

      steps.push({
        state: newArray.map((value, idx) => ({
          comparing: idx === j || idx === j - 1,
          compared: idx < i && idx !== j && idx !== j - 1,
          value,
        })),
        arrows: [j - 1, j],
        message: {
          en: `Swapped. ${newArray[j - 1]} keeps moving left until it finds something smaller.`,
          es: `Intercambiadas. ${newArray[j - 1]} sigue moviéndose a la izquierda hasta encontrar algo menor.`,
        },
      });

      j--;
    }

    steps.push({
      state: newArray.map((value, idx) => ({
        comparing: idx === j,
        compared: idx <= i && idx !== j,
        value,
      })),
      arrows: [j],
      message: {
        en: `Position ${j} is the right spot: the range 0..${i} is now sorted.`,
        es: `La posición ${j} es el lugar correcto: el tramo 0..${i} ya está ordenado.`,
      },
    });
  }

  steps.push({
    state: newArray.map(value => ({ comparing: false, compared: true, value })),
    arrows: [],
    message: {
      en: 'Array sorted! Insertion Sort runs in O(n) on nearly-sorted arrays.',
      es: '¡Arreglo ordenado! Insertion Sort es O(n) en arreglos casi ordenados.',
    },
  });

  return steps;
};
