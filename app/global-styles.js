import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .landing {
    display: inline-grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr 6fr 6fr 1fr;
    position:absolute;
    background: black;
    top:0;
    bottom:0;
    left:0;
    right:0;
  }
  
  .login {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 1
    grid-row-end: 2;
    place-self: end;
  }

  .people {
    border-style: solid;
    color: black;
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 4;
    grid-row-end: 5;
  }
  
  .tour {
    color: black;
    border-style: solid;
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
  }
  
  .contact {
    color: black;
    border-style: solid;
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 4;
    grid-row-end: 5;
  }
  
`;

export default GlobalStyle;
