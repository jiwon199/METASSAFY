import React from 'react';
import styled from 'styled-components';
import API from '../../../utils/api';
import { VscAdd } from 'react-icons/vsc';
import { NavLink } from 'react-router-dom';

const RecommendListItem = ({ friend }) => {
  let user = 'annonymous';
  if (window.localStorage.getItem('USER')) {
    user = JSON.parse(window.localStorage.getItem('USER')).user_id;
  }

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

  return (
    <>
      <GroupStyle>
        <FriendItemStyle>
          <FriendImgDivStyle>
            <NavLink to={`../profile/${friend.user_id}`}>
              <FriendImgStyle
                img
                src={friend.profile_img}
                alt={friend.name}
              ></FriendImgStyle>
            </NavLink>
          </FriendImgDivStyle>
          <TextGroupStyle>
            <NameTextStyle>
              <strong>{friend.name}</strong>
            </NameTextStyle>
            <StateTextStyle>@{friend.user_id}</StateTextStyle>
          </TextGroupStyle>
        </FriendItemStyle>
        <IconStyle>
          <VscAdd color="#212121" onClick={() => onAddFriend(friend.user_id)} />
        </IconStyle>
      </GroupStyle>
      <HrStyle />
    </>
  );
};

export default RecommendListItem;

const FriendImgStyle = styled.img`
  vertical-align: middle;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 70%;
`;

const FriendImgDivStyle = styled.div`
  display: 'flex';
  padding: 0.5rem;
`;

const TextGroupStyle = styled.div`
  display: 'flex';
  flex-direction: 'row';
  text-align: 'center';
  margin: auto;
`;

const NameTextStyle = styled.div`
  display: 'flex';
  flex-direction: 'column';
  text-align: 'center';
`;

const StateTextStyle = styled.div`
  padding-top: 0.5rem;
  font-size: 0.5rem;
`;

const FriendItemStyle = styled.div`
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
`;

const GroupStyle = styled.div`
  display: flex;
  flex-direction: 'row';
  justify-content: space-between;
`;

const IconStyle = styled.div`
  display: flex;
  align-items: center;
  right: 20px;
  padding: 5px;
`;

const HrStyle = styled.hr`
  margin: 0px;
  background: #d9d9d9;
  border: 0.1px solid #d9d9d9;
`;
