import React, { useState } from 'react'
import { Content } from './Content';
import { Header } from './Header';

import { generateRandomArray } from '../algorithms/generateRandomArray';
import { bubbleSort } from '../algorithms/bubbleSort';
import { insertionSort } from '../algorithms/insertionSort';
import { quickSort } from '../algorithms/quickSort';
import { selectionSort } from '../algorithms/selectionSort';
import { sleep } from '../algorithms/sleep';

import './sorting-visualizer.css'
import { mergeSort } from '../algorithms/mergeSort';

const generateRandomContent = (length) => {
  return generateRandomArray(length, 1, 1000).map(value => ({
    comparing: false,
    compared: false,
    value,
  }))
}

export const SortingVisualizer = () => {
  const [minSize, maxSize] = [1, 100];
  const [size, setSize] = useState(50);
  const [minSpeed, maxSpeed] = [0, 50];
  const [speed, setSpeed] = useState(30);
  const [array, setArray] = useState(generateRandomContent(size));

  const resetArray = () => setArray(generateRandomContent(size));

  const onChangeArraySize = ({ target: { value }}) => {
    setSize(Number(value));
  };

  const onChangeSpeed = ({ target: { value }}) => {
    setSpeed(Number(value));
  };

  const onBubbleSort = () => {
    const values = array.map(({ value }) => value);
    const stepsToSort = bubbleSort(values);
    return stepsToSort;
  };

  const onInsertionSort = () => {
    const values = array.map(({ value }) => value);
    const stepsToSort = insertionSort(values);
    return stepsToSort;
  };

  const onMergeSort = () => {
    const values = array.map(({ value }) => value);
    const stepsToSort = mergeSort(values);
    return stepsToSort;
  };

  const onQuickSort = () => {
    const values = array.map(({ value }) => value);
    const stepsToSort = quickSort(values);
    return stepsToSort;
  };

  const onSelectionSort = () => {
    const values = array.map(({ value }) => value);
    const stepsToSort = selectionSort(values);
    return stepsToSort;
  };

  const paintSteps = async (fn) => {
    const sleepStep = maxSpeed - speed <= 5 ? 5 : maxSpeed - speed;
    console.log('sleepStep: ', sleepStep);
    const steps = fn();
    for (const step of steps) {
      await sleep(sleepStep);
      setArray(step);
    }
  }

  return (
    <div className='app-container'>
      <Header
        size={size}
        minSize={minSize}
        maxSize={maxSize}
        speed={speed}
        minSpeed={minSpeed}
        maxSpeed={maxSpeed}
        onBubbleSort={() => paintSteps(onBubbleSort)}
        onChangeSize={onChangeArraySize}
        onChangeSpeed={onChangeSpeed}
        onInsertionSort={() => paintSteps(onInsertionSort)}
        onMergeSort={() => paintSteps(onMergeSort)}
        onQuickSort={() => paintSteps(onQuickSort)}
        onReset={resetArray}
        onSelectionSort={() => paintSteps(onSelectionSort)}
      />
      <Content array={array} />
    </div>
  )
}
