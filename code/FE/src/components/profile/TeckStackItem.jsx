import styled from 'styled-components';

function TechStackItem(props) {
  return (
    <ListStyle key={props.id}>
      <ImgStyle src={props.image} alt={props.title} />
    </ListStyle>
  );
}

export default TechStackItem;

const ListStyle = styled.li`
  margin-right: 0.5rem;
`;

const ImgStyle = styled.img`
  border-radius: 5px;
`;
