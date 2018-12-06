import styled from 'styled-components';
import image from '../images/toa-heftiba-578073-unsplash-min.jpg';

const TopRight = styled.div`
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
  background-position: center;
  background-size: cover;
  background-image: url('${image}');
  background-attachment: fixed;
  background-repeat: no-repeat;
  filter: blur(1px);
  -webkit-filter: blur(1px);
`;

export default TopRight;
