import styled from 'styled-components';
import { useState } from 'react';

import MajorPositionClass from '../../components/phone/MajorPositionClass';
import TextGroupComponent from '../../components/profile/common/TextGroupComponent';
import BackgroundBox from '../../components/profile/common/BackgroundBox';
import RoundBox from '../../components/profile/common/RoundBox';
import InfoBox from '../../components/profile/common/InfoBox';
import { useEffect } from 'react';
import { fetchUserInfo } from '../../services/auth-service';

function PhoneUserProfile(props) {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const getUserInfo = async () => {
      const userData = await fetchUserInfo();
      setUserInfo(userData.data);
    };

    getUserInfo();
  }, []);

  return (
    <PhoneUserProfileStyle>
      <ProfileDiv>
        <BackgroundBox image={userInfo.profile_img} />
        {/* <img src="https://kr.object.ncloudstorage.com/metassafy/1e149903-44a1-40ef-8720-067916b22390aaaa.png"></img> */}
        <TextGroupComponent name={userInfo.name} class={userInfo.class} />
        {/* 전공, 포지션, 공통 */}
        <MajorPositionClass
          major={userInfo.major}
          position={userInfo.position}
          track={userInfo.track}
        />
        {/* 기술스택 자기소개 생일 */}
        <RoundBox text={userInfo.introduce}></RoundBox>
        {/* <TechStackBox stack="android"></TechStackBox> */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '20rem',
          }}
        >
          {/* {stackDivs} */}
        </div>
        <InfoBox
          icon={<box-icon name="smile"></box-icon>}
          text="?????"
        ></InfoBox>
      </ProfileDiv>
    </PhoneUserProfileStyle>
  );
}

export default PhoneUserProfile;

const PhoneUserProfileStyle = styled.div`
  /* background-color: rgb(247, 254, 255); */
  border-radius: 1rem;
  /* border: 10px rgb(121, 190, 232) solid; */
  width: 22rem;
  /* height: 40rem; */
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const ProfileDiv = styled.div`
  width: 100%;
  height: 72%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #617485;
  }
`;
