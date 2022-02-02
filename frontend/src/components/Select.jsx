import React from 'react';

function Select({ type, array, ...attributes }) {
  return (
    <select name={type} id={type} {...attributes}>
      {array.map((option, index) => {
        return <option key={option + index} value={option} >{option}</option>
      })}
    </select>
  );
}

export default Select;