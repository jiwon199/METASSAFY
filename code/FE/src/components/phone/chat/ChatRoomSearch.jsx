import styled from 'styled-components';
import { useEffect, useState } from 'react';

function ChatRoomSearch({ setSearch }) {
  const [inputData, setData] = useState('');
  const onChange = (e) => {
    setData(e.target.value);
    setSearch(e.target.value);
  };
  return (
    <ChatRoomFormStyle>
      <ChatRoomButtonStyle>
        <ChatRoomSvgStyle
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke="#617485"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.9999 20.9999L16.6499 16.6499"
            stroke="#617485"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </ChatRoomSvgStyle>
      </ChatRoomButtonStyle>
      <ChatRoomInputStyle
        onChange={onChange}
        type="text"
        placeholder="새로운 채팅 시작하기"
        value={inputData}
      />
    </ChatRoomFormStyle>
  );
}

export default ChatRoomSearch;

const ChatRoomFormStyle = styled.div`
  background-color: #e0f4ff;
  height: 2rem;
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
  background-color: #e0f4ff;
  border: 0px;
  &::placeholder {
    color: #0000002f;
  }
  &:focus {
    outline: 0px;
  }
`;

const ChatRoomButtonStyle = styled.button`
  background-color: #e0f4ff;
  border: 0px;
  cursor: pointer;
`;

const ChatRoomSvgStyle = styled.svg`
  padding: 0.2rem;
`;
