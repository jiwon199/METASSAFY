import styled from 'styled-components';

function MyChatMessage(props) {
  return <MyChatMessageStyle>{props.chat}</MyChatMessageStyle>;
}

export default MyChatMessage;

const MyChatMessageStyle = styled.div`
  font-size: 0.8rem;
  word-break: break-all;
  background-color: #f9f6fc;
  width: auto;
  max-width: 13rem;
  padding: 1rem;
  border-radius: 1rem 0rem 1rem 1rem;
`;
