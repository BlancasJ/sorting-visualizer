import React from 'react'
import './button.css';

export const Button = ({ message, onClick }) => {
  return (
    <button className='btn' onClick={onClick}>{ message }</button>
  )
}
