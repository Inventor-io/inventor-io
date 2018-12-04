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

  .background {
    z-index: 999;
    top:0;
    left:0;
    bottom:0;
    right:0;
    height:400%;
    width:100%;
    position: absolute;
  }

  .gradient {
    height: 25%;
    background: rgba(0,0,0,.4);
    z-index: 9;
    position: relative;
  }

  .landing {
    height: 25%;
    display: inline-grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr 6fr 6fr;
    position: absolute;
    background-color: black;
    top:0;
    bottom:0;
    left:0;
    right:0;
    
  }
  
  .login {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 2;
    place-self: end;
    position: relative;
    z-index: 12;
  }
  
  .people {
    min-height: 50%;
    max-height: 75%;
    width: 100%;
    display: inline-grid;
    grid-template-columns:  1fr 2fr 1fr 2fr 1fr;
    grid-template-rows: 1fr 4fr 1fr 4fr 1fr 4fr 1fr 4fr 1fr;
    background: white;
    color: black;
}

  .tour {
    width: 100%;
    height: 50%;
    display: inline-grid;
    grid-template-columns: 1fr 1fr 4fr 1fr 4fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 4fr 1fr 4fr 1fr 4fr 1fr 1fr;
    color: black;
}

  .contact {
    width: 100%;
    height: 7%;
    background: rgba(0, 0, 0, 0);
    color: black;
}

.top-right-people{
    grid-column-start: 4;
    grid-column-end: 5;
    grid-row-start: 2;
    grid-row-end: 3;
}

.middle-left-people {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 4;
    grid-row-end: 5;
}

.middle-right-people {
    grid-column-start: 4;
    grid-column-end: 5;
    grid-row-start: 6;
    grid-row-end: 7;
}

.bottom-left-people {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 8;
    grid-row-end: 9;
}

.center {
  place-self: center;
}

.recipe-graph {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 3;
    grid-row-end: 4;
}

.recipe-desc {
    grid-column-start: 5;
    grid-column-end: 6;
    grid-row-start: 3;
    grid-row-end: 4;
}

.inventory-graph {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 5;
    grid-row-end: 6;
}

.inventory-desc {
    grid-column-start: 5;
    grid-column-end: 6;
    grid-row-start: 5;
    grid-row-end: 6;
}

.sales-graph {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 7;
    grid-row-end: 8;
}

.sales-desc { 
    grid-column-start: 5;
    grid-column-end: 6;
    grid-row-start: 7;
    grid-row-end: 8;
}
.background-tour {
  background: #ffeeb9;
  grid-column-start: 2;
  grid-column-end: 7;
  grid-row-start: 2;
  grid-row-end: 9;
}

.dash-graph {
  height: 40%;
  width: 40%;
}
`;

export default GlobalStyle;
