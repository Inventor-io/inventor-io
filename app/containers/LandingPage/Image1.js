import styled from 'styled-components';
import image from './images/joshua-rodriguez-422768-unsplash.jpg';

const TopLeft = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 3;
  background-position: center;
  background-size: cover;
  background-image: url('${image}');
`;

export default TopLeft;
