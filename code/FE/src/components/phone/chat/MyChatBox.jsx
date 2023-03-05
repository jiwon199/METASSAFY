import MyChatMessage from './MyChatMessage';
import ChatTime from './ChatTime';

import styled from 'styled-components';
import NotRead from './NotRead';

function MyChatBox(props) {
  return (
    <ChatBoxStyle>
      <UnderDiv>
        <NotRead notRead={props.chat.not_read} who="me" />
        <ChatTime time={props.chat.regtime} />
      </UnderDiv>
      <MyChatMessage chat={props.chat.message} />
    </ChatBoxStyle>
  );
}

export default MyChatBox;

const ChatBoxStyle = styled.div`
  padding: 0.5rem;
  justify-self: right;
  display: flex;
`;

const UnderDiv = styled.div`
  align-self: flex-end;
`;
