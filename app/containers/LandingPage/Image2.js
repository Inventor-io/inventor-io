import styled from 'styled-components';
import image from './images/toa-heftiba-578073-unsplash.jpg';

const TopRight = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
  background-position: center;
  background-size: cover;
  background-image: url('${image}');
`;

export default TopRight;
