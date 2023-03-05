import styled from 'styled-components';

function Card(props) {
  return <CardStyle>{props.children}</CardStyle>;
}

export default Card;

const CardStyle = styled.div`
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;
