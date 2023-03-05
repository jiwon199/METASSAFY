import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FriendListItem from './FriendListItem';
import axios from 'axios';
import API from '../../../utils/api';

const FriendList = () => {
  const [friends, setFriends] = useState([]);

  let user = 'annonymous';
  if (window.localStorage.getItem('USER')) {
    user = JSON.parse(window.localStorage.getItem('USER')).user_id;
  }

  const onDeleteFriend = (user_id) => {
    API.post(`/friend/deleteFriend/${user}/${user_id}`, {
      user_id: user_id,
    }).then(function () {
      setFriends(friends.filter((item) => item.user_id !== user_id));
    });
  };

  useEffect(() => {
    API.get('/friend/getFriendList/' + user)
      .then((res) => {
        setFriends(res.data);
      })
      .catch((err) => console.log());
  }, []);

  return (
    <ul>
      <FriendListStyle>
        {friends.map((friend) => (
          <FriendListItem
            key={friend.user_id}
            friend={friend}
            onDeleteFriend={onDeleteFriend}
          />
        ))}
      </FriendListStyle>
    </ul>
  );
};

export default FriendList;

const FriendListStyle = styled.div`
  /* padding: 1rem; */
  border-radius: 1rem 1rem 1rem 0rem;
`;
