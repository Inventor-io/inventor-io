import styled from 'styled-components';
import image from '../images/Niik-min.jpg';

const Nik = styled.div`
  grid-column-start: 4;
  grid-column-end: 5;
  grid-row-start: 4;
  grid-row-end: 5;
  background-image: url('${image}');
  background-position: right;

background-repeat: no-repeat;

background-size: cover;
`;

export default Nik;
