import styled from 'styled-components';
import image from '../images/IMG_6667.jpg';

const John = styled.div`
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 8;
  grid-row-end: 9;
  background-image: url('${image}');
  background-position: right;

background-repeat: no-repeat;

background-size: cover;
`;

export default John;
