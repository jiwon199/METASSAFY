import React from 'react';
import styled from 'styled-components';

const MyProfile = () => {
  let user = 'annonymous';
  if (window.localStorage.getItem('USER')) {
    user = JSON.parse(window.localStorage.getItem('USER'));
  }

  return (
    <MyProfileDivStyle>
      <MyProfileImgDivStyle>
        <MyProfileImgStyle
          img
          src={user.profile_img}
          alt={user.name}
        ></MyProfileImgStyle>
      </MyProfileImgDivStyle>
      <NameTextStyle>
        <strong>{user.name}</strong>
      </NameTextStyle>
    </MyProfileDivStyle>
  );
};

export default MyProfile;

const MyProfileImgStyle = styled.img`
  vertical-align: middle;
  width: 2rem;
  height: 2rem;
  border-radius: 70%;
`;

const MyProfileImgDivStyle = styled.div`
  display: flex;
  padding: 0.5rem;
`;

const MyProfileDivStyle = styled.div`
  border-radius: 20px;
  width: 18rem;
  height: 3rem;
  position: relative;
  margin-top: 5px;
  display: flex;
`;

const NameTextStyle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1.1rem;
`;
