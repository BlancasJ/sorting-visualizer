import React from 'react';
import { t } from '../i18n';
import './step-panel.css';

export const StepPanel = ({ lang, message, isRunning, isSkipped, onSkip }) => {
  const showSkip = isRunning && !isSkipped;

  return (
    <div className='step-panel'>
      <div className='legend'>
        <span className='legend-item'>
          <span className='swatch swatch-default' />
          {lang === 'es' ? 'Sin visitar' : 'Untouched'}
        </span>
        <span className='legend-item'>
          <span className='swatch swatch-comparing' />
          {lang === 'es' ? 'Comparando' : 'Comparing'}
        </span>
        <span className='legend-item'>
          <span className='swatch swatch-compared' />
          {lang === 'es' ? 'Ordenado' : 'Sorted'}
        </span>
      </div>
      <div className='step-row'>
        <p className='step-message'>
          {message || t(lang, 'idleHint')}
        </p>
        {showSkip ? (
          <button className='skip-btn' onClick={onSkip} type='button'>
            {t(lang, 'skip')}
          </button>
        ) : null}
      </div>
    </div>
  );
};
