import styled from 'styled-components';

function FriendChatMessage(props) {
  return <FriendChatMessageStyle>{props.chat}</FriendChatMessageStyle>;
}

export default FriendChatMessage;

const FriendChatMessageStyle = styled.div`
  font-size: 0.8rem;
  word-break: break-all;
  background-color: #e0f4ff;
  width: auto;
  max-width: 13rem;
  padding: 1rem;
  border-radius: 0rem 1rem 1rem 1rem;
`;
