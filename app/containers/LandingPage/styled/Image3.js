import styled from 'styled-components';
import image from '../images/jay-wennington-2065-unsplash-min.jpg';

const BottomLeft = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 5;
  background-position: center;
  background-size: cover;
  background-image: url('${image}');
  background-attachment: fixed;
  background-repeat: no-repeat;
  font-size: 7em;
  filter: blur(1px);
  -webkit-filter: blur(1px);
`;

export default BottomLeft;
