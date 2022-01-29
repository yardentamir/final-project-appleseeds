import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@import url("https://fonts.googleapis.com/css2?family=Comfortaa&display=swap");

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Comfortaa", cursive;
  background: #fafafa;
}

ul,
li {
  list-style: none;
}

img {
  max-width: 100%;
}

a{
  text-decoration: none;
}
`

export default GlobalStyle;