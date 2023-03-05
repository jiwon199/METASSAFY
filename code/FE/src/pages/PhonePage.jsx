// import { useHistory } from 'react-router-dom';
// import TextGroupComponent from '../components/phone/TextGroupComponent';
import Phone from '../components/UI/Phone';
import React from 'react';

// import GetUserStack from '../components/phone/GetUserStack';
import { useEffect } from 'react';
import { fetchUserInfo } from '../services/auth-service';

import PhoneNav from '../components/phone/phoneNav/PhoneNav';
import { Outlet } from 'react-router';

function Page1() {
  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await fetchUserInfo();
    };

    getUserInfo();
  }, []);

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Phone>
        <Outlet />
        <PhoneNav />

        {/* 프로필 사진
      활동중 뱃지
      이름
      반
      <TextGroupComponent name='김싸피' class='구미 2반'/>
      전공
      포지션
      공통
      기술스택
      자기소개
      생일 */}
      </Phone>
      {/* <GetUserStack></GetUserStack> */}
    </section>
  );
}

export default Page1;
