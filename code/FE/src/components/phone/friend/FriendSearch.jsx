import React, { useState, useEffect } from 'react';
import FriendSearchItem from './FriendSearchItem';
import styled from 'styled-components';
import API from '../../../utils/api';
import { ReactComponent as Search } from '../../../assets/icons/search.svg';

const FriendSearch = () => {
  const [userInput, setUserInput] = useState('');
  const [searchUser, setSearchUser] = useState([]);

  let user = 'annonymous';
  if (window.localStorage.getItem('USER')) {
    user = JSON.parse(window.localStorage.getItem('USER')).user_id;
  }

  useEffect(() => {
    API.get('/user/allUser')
      .then((res) => {
        setSearchUser(res.data.filter((item) => item.user_id !== user));
      })
      .catch((err) => console.log());
  }, []);

  const onAddFriend = (to_user_id) => {
    API.get('friend/call/notify/' + user + '/' + to_user_id)
      .then((res) => {
        if (res.data === true) {
          alert('신청 보냄');
        } else {
          alert('이미 친구거나 방치한 친구요청이 있습니다.');
        }
      })
      .catch((err) => console.log());
  };

  const getValue = (event) => {
    setUserInput(event.target.value);
  };

  const searched = searchUser.filter((item) => item.name.includes(userInput));
  return (
    <div>
      <FlexDiv>
        <Search stroke="#617485" />
        <StyledInput onChange={getValue} placeholder="유저 이름을 입력하세요" />
      </FlexDiv>
      {searched.map((item) => (
        <FriendSearchItem
          key={item.user_id}
          {...item}
          onAddFriend={onAddFriend}
        />
      ))}
    </div>
  );
};

export default FriendSearch;

const FlexDiv = styled.div`
  display: flex;
  margin: 0rem 2rem;
  /* justify-content: space-around; */
`;

const StyledInput = styled.input`
  margin-left: 1rem;
  border: none;
  border-bottom: 1px solid #617485;
  &::placeholder {
    color: #0000002f;
  }
  &:focus {
    outline: 0px;
  }
`;
