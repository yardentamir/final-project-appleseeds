import styled from "styled-components";

export const SpinnerStyled = styled.div`
display: flex;
align-items: center;
justify-content: center;
z-index: 5;

.spinner{
  font-size: 60px;
  widtH: 1em;
  height: 1em;
  fill: transparent;
  stroke: var(--first-color);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: 125;
  animation: spinner 4s linear infinite;
}

@keyframes spinner{
  0%{
    stroke-dashoffset: 25;
    transform: rotate(0deg);
  }
  50%{
    stroke-dashoffset: 125;
    transform: rotate(720deg);
  }
  100%{
    stroke-dashoffset: 25;
    transform: rotate(1080deg);
  }
}

.spinner > circle{
  fill: transparent;
}
`;