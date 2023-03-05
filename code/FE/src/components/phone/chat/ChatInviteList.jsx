import styled from 'styled-components';
import API from '../../../utils/api';
import { getJsonLocalUserInfo } from '../../../utils/local-storage';
import ChatInviteItem from './ChatInviteItem';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

// const tempInviteList = ['ssafy', 'ssafy2', 'admin'];

function ChatInviteList(props) {
  const user = getJsonLocalUserInfo()['user_id'] || 'annonymous';
  const name = getJsonLocalUserInfo()['name'] || 'annonymous';

  const navigate = useNavigate();

  const tempInviteList = props.inviteList.map((item) => item[1]);
  let newChatRoomName = '';
  props.inviteList.map((item) => {
    newChatRoomName += item[0] + ', ';
  });
  newChatRoomName = newChatRoomName.substring(0, newChatRoomName.length - 2);

  const frm = new FormData();

  const chatParameterDto = {
    croom_name: newChatRoomName,
    // participants: ['ssafy', 'ssafy3', 'ssafy4', 'ssafy5'],
    participants: tempInviteList,
  };

  frm.append(
    'chatParameterDto',
    new Blob([JSON.stringify(chatParameterDto)], {
      type: 'application/json',
    })
  );

  frm.append(
    'croom_img',
    new Blob([JSON.stringify(null)], {
      type: 'application/json',
    })
  );

  // frm.append('croom_img', null);

  function makeChatRoom() {
    API.post(`/chat/room`, frm, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((res) => {
        navigate(`room/${res.data}`);
      })
      .catch((err) => console.log());
  }

  return (
    <div>
      {newChatRoomName.length !== name.length && (
        <>
          <ChatInviteDiv>
            <ChatInviteText>
              <strong>초대된 목록</strong>
            </ChatInviteText>
            <ChatInviteBtn onClick={makeChatRoom}>
              <BiMessageSquareAdd />
            </ChatInviteBtn>
          </ChatInviteDiv>
          <ChatInviteListDiv>
            {props.inviteList.map((item) => {
              if (item[1] !== user) {
                return <ChatInviteItem name={item} key={item[1]} />;
              }
            })}
          </ChatInviteListDiv>
        </>
      )}
    </div>
  );
}

export default ChatInviteList;

const ChatInviteDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0rem 1rem;
`;

const ChatInviteText = styled.p`
  font-size: 0.8rem;
`;

const ChatInviteBtn = styled.p`
  &:hover {
    cursor: pointer;
  }
`;

const ChatInviteListDiv = styled.div`
  height: 10rem;
  overflow-x: auto;
  padding: 0.5rem;
  display: grid;
  width: 100%;
  height: auto;
  grid-template-columns: repeat(auto-fill, minmax(30%, auto));
  white-space: nowrap;
  &::-webkit-scrollbar {
    height: 0.2rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #e0f4ff;
  }
`;
