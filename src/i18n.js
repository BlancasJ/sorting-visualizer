export const LANGUAGES = ['en', 'es'];
export const DEFAULT_LANG = 'en';

export const UI = {
  en: {
    title: 'Sorting Visualizer',
    generateNewArray: 'New Array',
    arraySize: 'Array Size',
    speed: 'Speed (skip mode)',
    bubbleSort: 'Bubble Sort',
    insertionSort: 'Insertion Sort',
    mergeSort: 'Merge Sort',
    quickSort: 'Quick Sort',
    selectionSort: 'Selection Sort',
    skip: 'Skip explanation',
    running: 'Running…',
    idleHint: 'Pick an algorithm to watch it work step by step. Each move is explained in plain language; click "Skip explanation" at any moment to finish fast.',
    languageLabel: 'Language',
  },
  es: {
    title: 'Sorting Visualizer',
    generateNewArray: 'Nuevo arreglo',
    arraySize: 'Tamaño',
    speed: 'Velocidad (modo skip)',
    bubbleSort: 'Bubble Sort',
    insertionSort: 'Insertion Sort',
    mergeSort: 'Merge Sort',
    quickSort: 'Quick Sort',
    selectionSort: 'Selection Sort',
    skip: 'Saltar explicación',
    running: 'Ejecutando…',
    idleHint: 'Elige un algoritmo para verlo paso a paso. Cada movimiento se explica con palabras; pulsa "Saltar explicación" en cualquier momento para terminar rápido.',
    languageLabel: 'Idioma',
  },
};

export const t = (lang, key) => (UI[lang] && UI[lang][key]) || UI[DEFAULT_LANG][key] || key;
