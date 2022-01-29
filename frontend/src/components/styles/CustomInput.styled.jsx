import styled from "styled-components";

export const CustomInputStyled = styled.input`
  background-color: var(--color-light-gray);
  padding: 0.5rem;
  border: 1px solid transparent;
  width: 100%;
  border-radius: 6px;
  font-size: 1rem;
  font-family: sans-serif;

&:focus {
  color: var(--color-dark);
  background-color: var(--color-white);
  border-color: var(--color-p);
  outline: 0;
  border: 1px solid var(--color-p);
}
`