import styled from 'styled-components';
import { useState } from 'react';

import MajorPositionClass from '../../components/phone/MajorPositionClass';
import TextGroupComponent from '../../components/phone/TextGroupComponent';
import BackgroundBox from '../../components/phone/BackgroundBox';
import RoundBox from '../../components/phone/RoundBox';
import TechStackBox from '../../components/phone/TechStackBox';
import InfoBox from '../../components/phone/InfoBox';

function PhoneUserProfile(props) {
  const [userinfo, setStacks] = useState({
    name: '배싸피',
    class: '구미2반',
    major: 'Java',
    position: 'FE',
    track: 'D211ER',
    stacks: ['Python', 'android', 'Java', 'C', 'C++', 'vuejs', 'svelte'],
    introduce:
      'React 가라사대 뉴진스가 있었으니...하루만에 모든 서비스 페이지가 만들어졌다. 그리고 6주가 남았다더라',
  });

  const stackDivs = userinfo.stacks.map((s, index) => {
    return <TechStackBox stack={s} key={index}></TechStackBox>;
  });

  return (
    <PhoneUserProfileStyle>
      <BackgroundBox />
      <TextGroupComponent name={userinfo.name} class={userinfo.class} />
      {/* 전공, 포지션, 공통 */}
      <MajorPositionClass
        major={userinfo.major}
        position={userinfo.position}
        track={userinfo.track}
      />
      {/* 기술스택 자기소개 생일 */}
      <RoundBox text={userinfo.introduce}></RoundBox>
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
        {stackDivs}
      </div>
      <InfoBox icon={<box-icon name="smile"></box-icon>} text="?????"></InfoBox>
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
