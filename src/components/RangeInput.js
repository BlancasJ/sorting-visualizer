import React from 'react'
import './input.css';

export const RangeInput = ({ id, label, onChange, value, min, max }) => {
  return (
    <div className='input'>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        />
    </div>
  )
}
