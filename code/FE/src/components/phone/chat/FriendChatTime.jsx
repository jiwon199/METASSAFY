import styled from 'styled-components';

function FriendChatTime() {
  return <ChatText>오후 13:10</ChatText>;
}

export default FriendChatTime;

const ChatText = styled.p`
  font-size: 0.3rem;
  color: #0000006a;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.3rem;
  text-align: right;
`;
