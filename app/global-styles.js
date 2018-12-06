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
    height: 28%;
    background: rgba(0,0,0,.4);
    z-index: 9;
    position: relative;
  }

  .landing {
    height: 28%;
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
    grid-template-columns:  1fr 2fr 2fr 1fr;
    grid-template-rows: 1fr 4fr 4fr 4fr 4fr 1fr;
    background: white;
    color: black;
}

  .tour {
    width: 100%;
    height: 50%;
    display: inline-grid;
    grid-template-columns: 1fr 1fr 14fr 1fr 4fr 1fr 1fr;
    grid-template-rows: .3fr .3fr 2fr .1fr 2fr .1fr .4fr;
    color: black;
}

  .contact {
    width: 100%;
    height: 7%;
    background: rgba(0, 0, 0, 0);
    color: black;
}

.top-right-people{
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;
    padding: 1em;
}

.middle-left-people {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;
    padding: 1em 1em;
}

.middle-right-people {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 4;
    grid-row-end: 5;
}

.bottom-left-people {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 5;
    grid-row-end: 6;
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
  background: #e2873d;
  grid-column-start: 2;
  grid-column-end: 7;
  grid-row-start: 2;
  grid-row-end: 9;
}

.dash-graph {
  height: 40%;
  width: 40%;
}

.landing-icon {
  color: rgba(255, 255, 255, .70);
  z-index: 80;
  position: relative;
  top: 50%;
  left: 71%;
}

.big-icon {
  font-size: 7em;
}

.up-arrow {
  color: wheat;
  text-shadow: 0px 2px black;
  left: 47%
  position: absolute;
}

.salesPage {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 5fr 4fr 1fr;
  grid-template-rows: 1fr 1fr 4fr 1fr;
  position: absolute;
}

.sales-header {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
}

.sales-table {
  position: absolute;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
}

.sales-total {
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 4;
}

.sales-sold {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
  padding-left: 5em;
}

.sales-header-sold {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  padding-left: 2em;
}

.enter-sales {
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 4;
  max-height: 4em;
  max-width: 12em;
  margin-top: 1em !important;
  margin-left: 5em !important;
}
 .big {
   font-size: 1.5em;
   padding: 1em 1em 1em 1em;
 }

 .bigger {
   font-size: 1.5em;
   padding-right: 1em;
   color: white;
    text-shadow: 2px 2px 10px rgba(0,0,0,.4);
 }

 .bigger-logo {
  font-weight: 900;
  font-size: 4em;
  color: white;
  text-shadow: 2px 2px 10px rgba(0,0,0,.4);
 }

 .small {
   font-size: .7em;
 }
`;

export default GlobalStyle;
