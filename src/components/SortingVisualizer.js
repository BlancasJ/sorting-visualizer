import React, { useRef, useState } from 'react';
import { Content } from './Content';
import { Header } from './Header';
import { StepPanel } from './StepPanel';

import { generateRandomArray } from '../algorithms/generateRandomArray';
import { bubbleSort } from '../algorithms/bubbleSort';
import { insertionSort } from '../algorithms/insertionSort';
import { quickSort } from '../algorithms/quickSort';
import { selectionSort } from '../algorithms/selectionSort';
import { mergeSort } from '../algorithms/mergeSort';
import { sleep } from '../algorithms/sleep';

import { DEFAULT_LANG } from '../i18n';

import './sorting-visualizer.css';

const EXPLAIN_DELAY_MS = 1400;

const generateRandomContent = (length) => {
  return generateRandomArray(length, 1, 1000).map((value) => ({
    comparing: false,
    compared: false,
    value,
  }));
};

export const SortingVisualizer = () => {
  const [minSize, maxSize] = [5, 100];
  const [size, setSize] = useState(25);
  const [minSpeed, maxSpeed] = [0, 50];
  const [speed, setSpeed] = useState(35);
  const [array, setArray] = useState(() => generateRandomContent(25));
  const [arrows, setArrows] = useState([]);
  const [message, setMessage] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);
  const [lang, setLang] = useState(DEFAULT_LANG);

  const skipRef = useRef(false);
  const runTokenRef = useRef(0);

  const resetArray = () => {
    if (isRunning) return;
    setArray(generateRandomContent(size));
    setArrows([]);
    setMessage('');
    setIsSkipped(false);
  };

  const onChangeArraySize = ({ target: { value } }) => {
    if (isRunning) return;
    const nextSize = Number(value);
    setSize(nextSize);
    setArray(generateRandomContent(nextSize));
    setArrows([]);
    setMessage('');
    setIsSkipped(false);
  };

  const onChangeSpeed = ({ target: { value } }) => {
    setSpeed(Number(value));
  };

  const onSkip = () => {
    skipRef.current = true;
    setIsSkipped(true);
  };

  const paintSteps = async (stepsFactory) => {
    if (isRunning) return;
    const myToken = ++runTokenRef.current;
    skipRef.current = false;
    setIsSkipped(false);
    setIsRunning(true);

    const steps = stepsFactory();

    for (const step of steps) {
      if (runTokenRef.current !== myToken) return;
      setArray(step.state);
      setArrows(step.arrows || []);
      if (!skipRef.current) {
        setMessage(step.message || '');
        await sleep(EXPLAIN_DELAY_MS);
      } else {
        const fastDelay = Math.max(4, maxSpeed - speed);
        await sleep(fastDelay);
      }
    }

    if (runTokenRef.current === myToken) {
      setArrows([]);
      setIsRunning(false);
    }
  };

  const values = () => array.map(({ value }) => value);

  return (
    <div className='app-container'>
      <Header
        lang={lang}
        onChangeLang={setLang}
        size={size}
        minSize={minSize}
        maxSize={maxSize}
        speed={speed}
        minSpeed={minSpeed}
        maxSpeed={maxSpeed}
        disabled={isRunning}
        onBubbleSort={() => paintSteps(() => bubbleSort(values()))}
        onChangeSize={onChangeArraySize}
        onChangeSpeed={onChangeSpeed}
        onInsertionSort={() => paintSteps(() => insertionSort(values()))}
        onMergeSort={() => paintSteps(() => mergeSort(values()))}
        onQuickSort={() => paintSteps(() => quickSort(values()))}
        onReset={resetArray}
        onSelectionSort={() => paintSteps(() => selectionSort(values()))}
      />
      <Content array={array} arrows={arrows} />
      <StepPanel
        lang={lang}
        message={message && typeof message === 'object' ? message[lang] : message}
        isRunning={isRunning}
        isSkipped={isSkipped}
        onSkip={onSkip}
      />
    </div>
  );
};
