import React from 'react';
import styled from 'styled-components';
import { VscAdd } from 'react-icons/vsc';
import { NavLink } from 'react-router-dom';

const FriendSearchItem = (props) => {
  return (
    <>
      <GroupStyle>
        <FriendItemStyle>
          <FriendImgDivStyle>
            <NavLink to={`../profile/${props.user_id}`}>
              <FriendImgStyle
                img
                src={props.profile_img}
                alt={props.name}
              ></FriendImgStyle>
            </NavLink>
          </FriendImgDivStyle>
          <TextGroupStyle>
            <NameTextStyle>
              <strong>{props.name}</strong>
            </NameTextStyle>
            <StateTextStyle>{`@${props.user_id}`}</StateTextStyle>
          </TextGroupStyle>
        </FriendItemStyle>
        <IconStyle>
          <VscAdd
            color="#212121"
            onClick={() => {
              props.onAddFriend(props.user_id);
            }}
          />
        </IconStyle>
      </GroupStyle>
      <HrStyle></HrStyle>
    </>
  );
};

export default FriendSearchItem;

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
  padding: 5px;
`;

const HrStyle = styled.hr`
  margin: 0px;
  background: #d9d9d9;
  border: 0.1px solid #d9d9d9;
`;
