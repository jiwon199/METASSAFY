import styled from 'styled-components';

function ChatTime(props) {
  let time = props.time.substring(11, 16);

  // 2023-02-03 14:44:23
  return (
    <ChatTextBox>
      <ChatText>{time}</ChatText>
    </ChatTextBox>
  );
}

export default ChatTime;

const ChatTextBox = styled.div`
  white-space: nowrap;
  display: flex;
`;

const ChatText = styled.p`
  font-size: 0.5rem;
  color: #0000006a;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.3rem;
  align-self: flex-end;
`;
