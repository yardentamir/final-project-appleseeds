import React from 'react';
import { SelectStyled } from './styles/Select.styled';

function Select({ type, array, selected, ...attributes }) {
  return (
    <SelectStyled >
      <select name={type} id={type} {...attributes} value={selected}>
        {array.map((option, index) => {
          return <option key={option + index} value={option} >{option}</option>
        })}
      </select>
    </SelectStyled>
  );
}

export default Select;