import React from 'react'
import { Button } from './Button'
import { RangeInput } from './RangeInput';
import './header.css';

export const Header = ({
  size,
  minSize,
  maxSize,
  speed,
  minSpeed,
  maxSpeed,
  onBubbleSort,
  onChangeSize,
  onChangeSpeed,
  onInsertionSort,
  onMergeSort,
  onQuickSort,
  onReset,
  onSelectionSort,
}) => {
  return (
    <div className='header'>
      <h1 className='head-title'>Sorting Visualizer</h1>
      <div className='head-options'>
        <div className='button-container'>
          <Button message={'Generate New Array'} onClick={onReset} />
        </div>
        <div className='input-container'>
          <RangeInput
            label={'Change Array Size'}
            id={'changeSize'}
            value={String(size)}
            onChange={onChangeSize}
            min={String(minSize)}
            max={String(maxSize)}
          />
        </div>
        <div className='input-container'>
          <RangeInput
            label={'Change Speed'}
            id={'changeSpeed'}
            value={String(speed)}
            onChange={onChangeSpeed}
            min={String(minSpeed)}
            max={String(maxSpeed)}
          />
        </div>
        <div className='button-container'>
          <Button message={'Bubble Sort'} onClick={onBubbleSort} />
        </div>
        <div className='button-container'>
          <Button message={'Insetion Sort'} onClick={onInsertionSort} />
        </div>
        <div className='button-container'>
          <Button message={'Merge Sort'} onClick={onMergeSort} />
        </div>
        <div className='button-container'>
          <Button message={'Quick Sort'} onClick={onQuickSort} />
        </div>
        <div className='button-container'>
          <Button message={'Selection Sort'} onClick={onSelectionSort} />
        </div>
      </div>
    </div>
  );
};
