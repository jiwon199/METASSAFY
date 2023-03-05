import styled from 'styled-components';
import { useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

function ChatRoomForm({ setChat, send }) {
  const [chatText, setChatText] = useState('');

  function onChange(e) {
    setChatText(e.target.value);
    setChat(e.target.value);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      submitText();
    }
  }

  function onClickHandler() {
    submitText();
  }

  function submitText() {
    if (chatText.trim() !== '') {
      send();
      setChatText('');
    }
    // 제출
  }

  return (
    <ChatRoomFormStyle>
      <ChatRoomInputStyle
        type="text"
        placeholder="메시지를 입력해주세요"
        onChange={onChange}
        value={chatText}
        onKeyPress={handleKeyPress}
      />
      <ChatRoomButtonStyle onClick={onClickHandler}>
        <ChatRoomSendImgStyle
          width="1rem"
          height="1rem"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 2L11 13"
            stroke="#617485"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 22L22 2L2 9L11 13L15 22Z"
            stroke="#617485"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </ChatRoomSendImgStyle>
      </ChatRoomButtonStyle>
    </ChatRoomFormStyle>
  );
}

export default ChatRoomForm;

const ChatRoomFormStyle = styled.div`
  background-color: #f0faff;
  height: 2.3rem;
  width: 95%;
  text-align: center;
  justify-content: center;
  border-radius: 1rem;
  display: flex;
  margin: 0.5rem;
`;

const ChatRoomInputStyle = styled.input`
  align-items: center;
  width: 80%;
  font-size: 0.8rem;
  background-color: #f0faff;
  border: 0px;
  &::placeholder {
    color: #0000002f;
  }
  &:focus {
    outline: 0px;
  }
`;

const ChatRoomButtonStyle = styled.button`
  background-color: #f0faff;
  border: 0px;
  cursor: pointer;
`;

const ChatRoomSendImgStyle = styled.svg`
  padding-top: 0.2rem;
`;
