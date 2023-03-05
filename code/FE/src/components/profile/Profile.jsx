import styled from 'styled-components';

import MajorPositionClass from '../phone/MajorPositionClass';
import TextGroupComponent from './common/TextGroupComponent';
import BackgroundBox from './common/BackgroundBox';
import RoundBox from './common/RoundBox';
import InfoBox from './common/InfoBox';
import TechStackList from './TechStackList';
import {
  FaRegSmile,
  FaBirthdayCake,
  FaCreativeCommonsBy,
} from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

function Profile({ user }) {
  if (!Object.keys(user).length) {
    return;
  }

  return (
    <PhoneUserProfileStyle>
      <div>
        <BackgroundBox image={user.profile_img} who={user.user_id} />
        <TextGroupComponent
          name={user.name}
          area={user.area}
          class={user.common_class}
        />
        {/* 전공, 포지션, 공통 */}
        <MajorPositionClass
          major={user.major}
          position={user.interest}
          track={user.first_semester}
        />
        {/* 기술스택 자기소개 */}
        <TechStackList user_id={user.user_id}></TechStackList>
        <RoundBox text="자기소개"></RoundBox>
        <InfoListStyle>
          <InfoBox icon={<FaRegSmile />} text={user.profile_txt}></InfoBox>
          <InfoBox icon={<FaBirthdayCake />} text={user.birthday}></InfoBox>
          {user.gender !== 'z' && (
            <InfoBox
              icon={<FaCreativeCommonsBy />}
              text={user.gender === 'w' ? '여성' : '남성'}
            ></InfoBox>
          )}
          <InfoBox icon={<HiOutlineMail />} text={user.email}></InfoBox>
        </InfoListStyle>
      </div>
    </PhoneUserProfileStyle>
  );
}

export default Profile;

const PhoneUserProfileStyle = styled.div`
  border-radius: 1rem;
  width: 22rem;
  max-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 1rem;
`;

const ScrollDivStyle = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.3rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #617485;
    border-radius: 10px;
    background-clip: padding-box;
    /* border: 1px solid transparent; */
  }
  &::-webkit-scrollbar-track {
    /* background-color: #617485; */
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

const InfoListStyle = styled.div`
  padding: 0 1rem;
  width: 100%;
`;

const FloatDiv = styled.div`
  float: left;
`;
