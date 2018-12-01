import styled from 'styled-components';
import image from '../images/Nik.jpg';

const Nik = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 6;
  grid-row-end: 7;
  background-image: url('${image}');
  background-position: right;

background-repeat: no-repeat;

background-size: cover;
`;

export default Nik;