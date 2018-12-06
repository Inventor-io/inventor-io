import styled from 'styled-components';
import image from '../images/jakub-kapusnak-296881-unsplash-min (1).jpg';

const BottomRight = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 5;
  background-position: center;
  background-size: cover;
  background-image: url('${image}');
  background-attachment: fixed;
  background-repeat: no-repeat;
  filter: blur(1px);
  -webkit-filter: blur(1px);
`;

export default BottomRight;
