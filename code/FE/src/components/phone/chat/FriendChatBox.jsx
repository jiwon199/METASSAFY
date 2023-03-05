import FriendChatMessage from './FriendChatMessage';

import styled from 'styled-components';
import ChatTime from './ChatTime';
import { NavLink } from 'react-router-dom';
import NotRead from './NotRead';

function FriendChatBox(props) {
  return (
    <ChatBoxStyle>
      <NavLink to={`../profile/${props.chat.user_id}`}>
        <ChatImgDivStyle>
          <ChatImgStyle src={props.chat.profile_img} alt="" />
        </ChatImgDivStyle>
      </NavLink>
      <div>
        <UserIdStyle>{props.chat.name}</UserIdStyle>
        <FriendChatMessage chat={props.chat.message} />
      </div>
      <UnderDiv>
        <NotRead notRead={props.chat.not_read} who="you" />
        <ChatTime time={props.chat.regtime} />
      </UnderDiv>
    </ChatBoxStyle>
  );
}

export default FriendChatBox;

const ChatImgStyle = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
`;

const ChatBoxStyle = styled.div`
  display: flex;
  padding: 0.5rem;
  justify-self: left;
`;

const ChatImgDivStyle = styled.div`
  padding: 0.5rem;
  padding-bottom: 1rem;
`;

const UserIdStyle = styled.p`
  padding: 0.2rem;
  font-size: 0.5rem;
`;

const UnderDiv = styled.div`
  align-self: flex-end;
`;
