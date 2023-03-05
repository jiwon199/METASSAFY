import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Setting } from '../../../assets/icons/settings.svg';
import { NavLink } from 'react-router-dom';
import { getJsonLocalUserInfo } from '../../../utils/local-storage';
import { TbUserPlus } from 'react-icons/tb';
import API from '../../../utils/api';

function BackgroundBox(props) {
  const user = getJsonLocalUserInfo()['user_id'] || 'annonymous';

  function onAddFriend() {
    API.get('friend/call/notify/' + user + '/' + props.who)
      .then((res) => {
        if (res.data === true) {
          alert('신청 보냄');
        } else {
          alert('이미 친구거나 방치한 친구요청이 있습니다.');
        }
      })
      .catch((err) => console.log());
  }

  return (
    <WrapperStyle>
      <BackgroundBoxStyle>
        {user === props.who && (
          <SettingDiv>
            <NavLink to="../profile/modify">
              <Setting
                stroke="#617485"
                style={{ float: 'right', margin: '1rem' }}
              />
            </NavLink>
          </SettingDiv>
        )}
        {user !== props.who && (
          <SettingDiv>
            <TbUserPlus
              stroke="#617485"
              style={{ float: 'right', margin: '1rem', cursor: 'pointer' }}
              onClick={onAddFriend}
            />
          </SettingDiv>
        )}
        <CircleBackgroundStyle>
          <CircleImgStyle src={props.image}></CircleImgStyle>
        </CircleBackgroundStyle>
      </BackgroundBoxStyle>
    </WrapperStyle>
  );
}

export default BackgroundBox;

const WrapperStyle = styled.div`
  display: block;
`;

const BackgroundBoxStyle = styled.div`
  background-color: #e0f4ff;
  border-radius: 20px;
  box-shadow: inset 0 0.2rem 0.2rem rgba(0, 0, 0, 0.0500000007);
  width: 20rem;
  height: 10rem;
  position: relative;
  margin-bottom: 3.3rem;
`;

const CircleBackgroundStyle = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(to left, #c1a1d3, #c3ddff);
  /* background-color: #8b9cd9; */
  border-radius: 100%;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const CircleImgStyle = styled.img`
  width: 90%;
  height: 90%;
  background-color: white;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SettingDiv = styled.div`
  display: inline-block;
  width: 100%;
`;
