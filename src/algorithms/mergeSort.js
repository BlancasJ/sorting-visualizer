const buildMergeView = (arr, l, r, k, L, R, iL, jR) => {
  const view = arr.slice();
  let pos = k;
  for (let x = iL; x < L.length; x++) view[pos++] = L[x];
  for (let y = jR; y < R.length; y++) view[pos++] = R[y];
  return view;
};

const stateFrom = (view, comparingSet, comparedSet) => view.map((value, index) => ({
  comparing: comparingSet.has(index),
  compared: comparedSet.has(index),
  value,
}));

const merge = (arr, l, m, r, steps) => {
  const L = arr.slice(l, m + 1);
  const R = arr.slice(m + 1, r + 1);

  let i = 0;
  let j = 0;
  let k = l;

  const rangeHighlight = new Set();
  for (let idx = l; idx <= r; idx++) rangeHighlight.add(idx);

  steps.push({
    state: stateFrom(buildMergeView(arr, l, r, k, L, R, i, j), rangeHighlight, new Set()),
    arrows: [l, m, r],
    message: {
      en: `Merging sub-arrays ${l}..${m} (left) and ${m + 1}..${r} (right) into one sorted range.`,
      es: `Mezclamos los sub-arreglos ${l}..${m} (izquierda) y ${m + 1}..${r} (derecha) en un único tramo ordenado.`,
    },
  });

  while (i < L.length && j < R.length) {
    const leftVal = L[i];
    const rightVal = R[j];
    const leftIdx = k;
    const rightIdx = k + (L.length - i);

    steps.push({
      state: stateFrom(
        buildMergeView(arr, l, r, k, L, R, i, j),
        new Set([leftIdx, rightIdx]),
        new Set(),
      ),
      arrows: [leftIdx, rightIdx],
      message: {
        en: `Compare the next left value ${leftVal} with the next right value ${rightVal}.`,
        es: `Comparamos el siguiente valor de la izquierda (${leftVal}) con el de la derecha (${rightVal}).`,
      },
    });

    if (leftVal <= rightVal) {
      arr[k] = leftVal;
      i++;
    } else {
      arr[k] = rightVal;
      j++;
    }

    steps.push({
      state: stateFrom(
        buildMergeView(arr, l, r, k + 1, L, R, i, j),
        new Set([k]),
        new Set(),
      ),
      arrows: [k],
      message: {
        en: `${arr[k]} is smaller (or equal): it goes into position ${k}.`,
        es: `${arr[k]} es menor (o igual): va a la posición ${k}.`,
      },
    });
    k++;
  }

  while (i < L.length) {
    arr[k] = L[i];
    steps.push({
      state: stateFrom(
        buildMergeView(arr, l, r, k + 1, L, R, i + 1, j),
        new Set([k]),
        new Set(),
      ),
      arrows: [k],
      message: {
        en: `Right side is done. Copy remaining left value ${L[i]} into position ${k}.`,
        es: `El lado derecho terminó. Copiamos el restante ${L[i]} de la izquierda en la posición ${k}.`,
      },
    });
    i++;
    k++;
  }

  while (j < R.length) {
    arr[k] = R[j];
    steps.push({
      state: stateFrom(
        buildMergeView(arr, l, r, k + 1, L, R, i, j + 1),
        new Set([k]),
        new Set(),
      ),
      arrows: [k],
      message: {
        en: `Left side is done. Copy remaining right value ${R[j]} into position ${k}.`,
        es: `El lado izquierdo terminó. Copiamos el restante ${R[j]} de la derecha en la posición ${k}.`,
      },
    });
    j++;
    k++;
  }
};

const recurse = (arr, l, r, steps) => {
  if (l >= r) return;
  const m = l + Math.floor((r - l) / 2);
  steps.push({
    state: arr.map((value, index) => ({
      comparing: index >= l && index <= r,
      compared: false,
      value,
    })),
    arrows: [l, m, r],
    message: {
      en: `Split range ${l}..${r} at index ${m}: we sort each half first and then merge them.`,
      es: `Dividimos el tramo ${l}..${r} en el índice ${m}: ordenamos primero cada mitad y luego las mezclamos.`,
    },
  });
  recurse(arr, l, m, steps);
  recurse(arr, m + 1, r, steps);
  merge(arr, l, m, r, steps);
};

export const mergeSort = (array) => {
  const newArray = [...array];
  const steps = [];

  steps.push({
    state: newArray.map(value => ({ comparing: false, compared: false, value })),
    arrows: [],
    message: {
      en: 'Merge Sort: divide and conquer. We split the array in halves recursively until each piece has one element, then merge them back in order.',
      es: 'Merge Sort: divide y vencerás. Partimos el arreglo a la mitad recursivamente hasta tener trozos de un elemento, y luego los mezclamos en orden.',
    },
  });

  recurse(newArray, 0, newArray.length - 1, steps);

  steps.push({
    state: newArray.map(value => ({ comparing: false, compared: true, value })),
    arrows: [],
    message: {
      en: 'Array sorted! Merge Sort is always O(n log n) but needs O(n) extra memory.',
      es: '¡Arreglo ordenado! Merge Sort siempre es O(n log n) pero requiere O(n) memoria extra.',
    },
  });

  return steps;
};
