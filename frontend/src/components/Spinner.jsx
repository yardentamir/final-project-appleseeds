import React from 'react';
import { SpinnerStyled } from './styles/Spinner.styled';

function Spinner() {
  return (
    <SpinnerStyled>
      <svg className="spinner" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" ></circle>
      </svg>
    </SpinnerStyled>
  );
}

export default Spinner;