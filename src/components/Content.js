import React from 'react'
import './content.css';

export const Content = ({ array }) => {
  return (
    <div className='content'>
      {array.map((element, index) => {
        const { comparing, compared, value } = element;
        const comparingClass = comparing ? ' comparing' : '';
        const comparedClass = compared ? ' compared' : '';
        const className = 'array-element' + comparingClass + comparedClass

        return <div key={index} className={className} style={ {
          height: value,
          backgroundColor: compared ? 'hsl(207, 79%, 59%)' : comparing ? 'hsl(39, 79%, 59%)' : 'hsl(286, 49%, 41%)',
        }}></div>
      })}
    </div>
  );
};