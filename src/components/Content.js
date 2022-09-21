import React from 'react'
import './content.css';

const MAX_VALUE = 1000;

export const Content = ({ array, arrows = [] }) => {
  const arrowSet = new Set(arrows);

  return (
    <div className='content'>
      {array.map((element, index) => {
        const { comparing, compared, value } = element;
        const comparingClass = comparing ? ' comparing' : '';
        const comparedClass = compared ? ' compared' : '';
        const className = 'array-element-col' + comparingClass + comparedClass;
        const heightPercent = (value / MAX_VALUE) * 100;

        return (
          <div key={index} className={className}>
            <div className='arrow-slot' aria-hidden='true'>
              {arrowSet.has(index) ? <span className='arrow'>▼</span> : null}
            </div>
            <div className='bar-slot'>
              <div className='array-element' style={{ height: `${heightPercent}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
