import { useSelector } from 'react-redux';
import styled from 'styled-components';

import WebModifyInputBoxList from '../components/profile/WebModifyInputBoxList';
import BackgroundModifyBox from '../components/profile/common/BackgroundModifyBox';
import { useState } from 'react';

const ProfileModify = () => {
  const user = useSelector((state) => state.auth.user);
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <CenterDIv>
      <PhoneStyle>
        <ProfileContainer>
          <BackgroundModifyBox
            user_id={user.user_id}
            image={user.profile_img}
            isSubmit={isSubmit}
          />
          <WebModifyInputBoxList setIsSubmit={setIsSubmit} />
        </ProfileContainer>
      </PhoneStyle>
    </CenterDIv>
  );
};

export default ProfileModify;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
`;

const PhoneStyle = styled.div`
  background-color: white;
  border-radius: 1rem;
  /* border: 10px rgb(121, 190, 232) solid; */
  width: 22rem;
  height: 120vh;
`;

const CenterDIv = styled.div`
  display: flex;
  justify-content: center;
`;
