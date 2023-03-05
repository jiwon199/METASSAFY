import styled from 'styled-components';

function ChatRoomNavStatus(props) {
  const userNum = props.chatRoom?.participants?.length;
  let users = '';
  props.chatRoom?.participants?.map((participants) => {
    users += participants + ', ';
  });
  const CurrentUser = users.substring(0, users.length - 2);

  return (
    <ChatRoomNavStatusStyle>
      <div>
        <ChatRoomNameStyle>
          <strong>{props.chatRoom?.croom_name}</strong>
        </ChatRoomNameStyle>
        <ChatRoomMemberStyle>{CurrentUser}</ChatRoomMemberStyle>
      </div>
      <UserNumP>
        <strong>{userNum}</strong>
      </UserNumP>
    </ChatRoomNavStatusStyle>
  );
}

export default ChatRoomNavStatus;

const ChatRoomNavStatusStyle = styled.div`
  padding: 0.3rem 0.3rem 0.3rem 0.3rem;
  display: flex;
  justify-content: space-between;
`;

const ChatRoomNameStyle = styled.p`
  font-size: 1.1rem;
  display: inline-block;
  width: 12.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatRoomMemberStyle = styled.p`
  font-size: 0.5rem;
  margin-top: 0.2rem;
  display: inline-block;
  width: 12.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserNumP = styled.p`
  font-size: 0.8rem;
  margin: 0.5rem;
  padding: 0.2rem 0rem 0rem 0rem;
`;
