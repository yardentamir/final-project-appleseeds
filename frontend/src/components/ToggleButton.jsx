

import styled from "styled-components";

const theme = {
  blue: {
    default: {
      bg: "var(--white-color)",
      color: "var(--dark-color-alt)"
    },
    hover: {
      bg: "#c4c2c2",
      color: "var(--dark-color-alt)",
    },
    active: {
      bg: "var(--first-color)",
      color: "var(--white-color)",
    }
  },
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default.bg};
  color: ${(props) => theme[props.theme].default.color};
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  margin: 10px 5px;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover.bg};
    color: ${(props) => theme[props.theme].hover.color};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: "blue"
};


export const ButtonToggle = styled(Button)`
  background-color: ${(props) => theme[props.theme].default.bg};
  ${({ active }) =>
    active &&
    ` background-color: ${theme.blue.active.bg};
    color: ${theme.blue.active.color}`}
`;