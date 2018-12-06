import styled from 'styled-components';
import image from '../images/Micahtbcompressed-min.jpg';

const Micah = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  background-image: url('${image}');
  background-position-y: 25%;

background-repeat: no-repeat;

background-size: cover;
`;

export default Micah;
