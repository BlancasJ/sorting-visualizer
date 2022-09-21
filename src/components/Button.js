import React from 'react'
import './button.css';

export const Button = ({ message, onClick, disabled = false }) => {
  return (
    <button className='btn' onClick={onClick} disabled={disabled}>{ message }</button>
  )
}
