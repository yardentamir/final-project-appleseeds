import styled from "styled-components";

export const SelectStyled = styled.div`

select {
  appearance: none;
  background-color: transparent;
  border: none;
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: 16px;
  cursor: inherit;
  line-height: inherit;
  z-index: 1;

  &::-ms-expand {
    display: none;
  }
  outline: none;
}


  display: grid;
  grid-template-areas: "select";
  align-items: center;
  position: relative;

  select,
  &::after {
    grid-area: select;
  }

  border: 1px solid #777;
  border-radius: 0.25em;

  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1.1;

  background-color: #fff;
  background-image: linear-gradient(to top, #f9f9f9, #fff 33%);

  &:not(--multiple)::after {
    content: "";
    position: absolute;
    justify-self: end;
    right:10px;
    width: 0.8em;
    height: 0.5em;
    background-color: #777;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }


select:focus + .focus {
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border: 2px solid blue;
  border-radius: inherit;
}

`;
