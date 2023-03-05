import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import chatImg from '../../../assets/images/chatroom.png';

function MyChatList(props) {
  return (
    <NavLink style={NavStyles} to={`room/${props.room.croom_no}`}>
      <ChatRoomListStyle>
        <ChatRoomNavImgStyle src={chatImg} alt={props.room.croom_name} />
        <ChatTextBoxDiv>
          <FlexDiv>
            <ChatRoomNameStyle>{props.room.croom_name}</ChatRoomNameStyle>
            <NotReadSpanStyle>{props.room.not_read_chat}</NotReadSpanStyle>
          </FlexDiv>
          <ChatTextStyle>
            <span>{props.room.last_chat}</span>
            <ChatTimeSpanStyle>
              {props.room.last_chat_time?.substring(11, 16)}
            </ChatTimeSpanStyle>
          </ChatTextStyle>
        </ChatTextBoxDiv>
      </ChatRoomListStyle>
    </NavLink>
  );
}

export default MyChatList;

const ChatRoomListStyle = styled.div`
  margin: 1.5rem;
  padding-bottom: 0.3rem;
  display: flex;
  border-bottom: 1px solid #d9d9d9;
`;

const ChatRoomNameStyle = styled.span`
  font-size: 1.1rem;
  color: black;
  display: inline-block;
  width: 13.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatTextBoxDiv = styled.div`
  width: 100%;
`;

const ChatTextStyle = styled.p`
  font-size: 0.5rem;
  color: #000000b3;
  display: flex;
  justify-content: space-between;
  margin: 0.3rem;
  padding-left: 0.5rem;
`;

const ChatTimeSpanStyle = styled.span`
  color: #00000066;
`;

const NotReadSpanStyle = styled.span`
  font-size: 0.8rem;
  color: #6ca4ae;
`;

const ChatRoomNavImgStyle = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavStyles = {
  textDecoration: 'none',
};
