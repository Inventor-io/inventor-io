import styled from 'styled-components';
import image from '../images/Niik-min.jpg';

const Nik = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 4;
  background-image: url('${image}');
  background-position: right;

background-repeat: no-repeat;

background-size: cover;
`;

export default Nik;
