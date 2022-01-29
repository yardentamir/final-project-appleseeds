import React from 'react';
import { CustomInputStyled } from './styles/CustomInput.styled';

function CustomInput({ type, placeholder }) {
  return (
    <CustomInputStyled type={type} placeholder={placeholder} />
  );
}

export default CustomInput;
