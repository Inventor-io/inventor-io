import styled from 'styled-components';
import image from '../images/IMG_6667-min (1).jpg';

const John = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 5;
  grid-row-end: 6;
  background-image: url('${image}');
  background-position: right;

background-repeat: no-repeat;

background-size: cover;
`;

export default John;
