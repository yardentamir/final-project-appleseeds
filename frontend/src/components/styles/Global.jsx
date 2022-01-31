import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@import url("https://fonts.googleapis.com/css2?family=Comfortaa&display=swap");


:root {
  --header-height: 3rem;


  --first-color: #3664f4;
  --dark-color: #070d1f;
  --dark-color-alt: #282b3a;
  --white-color: #e6e7e9;


  --body-font: "Poppins", sans-serif;
  --normal-font-size: 0.938rem;
  --small-font-size: 0.813rem;


  --z-fixed: 100;
}

@media screen and (min-width: 768px) {
  :root {
    --normal-font-size: 1rem;
    --small-font-size: 0.875rem;
  }
}



body {
  margin: var(--header-height) 0 0 0;
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
  font-weight: 500;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

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

img {
  max-width: 100%;
}

a{
  text-decoration: none;
}
`

export default GlobalStyle;