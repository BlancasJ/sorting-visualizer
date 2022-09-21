import React from 'react'
import { Button } from './Button'
import { RangeInput } from './RangeInput';
import { LANGUAGES, t } from '../i18n';
import './header.css';

export const Header = ({
  lang,
  onChangeLang,
  size,
  minSize,
  maxSize,
  speed,
  minSpeed,
  maxSpeed,
  disabled,
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
      <div className='head-top'>
        <h1 className='head-title'>{t(lang, 'title')}</h1>
        <div className='lang-switch' role='group' aria-label={t(lang, 'languageLabel')}>
          {LANGUAGES.map((code) => (
            <button
              key={code}
              type='button'
              className={'lang-btn' + (lang === code ? ' active' : '')}
              onClick={() => onChangeLang(code)}
              aria-pressed={lang === code}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className='head-options'>
        <div className='button-container'>
          <Button message={t(lang, 'generateNewArray')} onClick={onReset} disabled={disabled} />
        </div>
        <div className='input-container'>
          <RangeInput
            label={t(lang, 'arraySize')}
            id={'changeSize'}
            value={String(size)}
            onChange={onChangeSize}
            min={String(minSize)}
            max={String(maxSize)}
            disabled={disabled}
          />
        </div>
        <div className='input-container'>
          <RangeInput
            label={t(lang, 'speed')}
            id={'changeSpeed'}
            value={String(speed)}
            onChange={onChangeSpeed}
            min={String(minSpeed)}
            max={String(maxSpeed)}
          />
        </div>
        <div className='button-container'>
          <Button message={t(lang, 'bubbleSort')} onClick={onBubbleSort} disabled={disabled} />
        </div>
        <div className='button-container'>
          <Button message={t(lang, 'insertionSort')} onClick={onInsertionSort} disabled={disabled} />
        </div>
        <div className='button-container'>
          <Button message={t(lang, 'mergeSort')} onClick={onMergeSort} disabled={disabled} />
        </div>
        <div className='button-container'>
          <Button message={t(lang, 'quickSort')} onClick={onQuickSort} disabled={disabled} />
        </div>
        <div className='button-container'>
          <Button message={t(lang, 'selectionSort')} onClick={onSelectionSort} disabled={disabled} />
        </div>
      </div>
    </div>
  );
};
