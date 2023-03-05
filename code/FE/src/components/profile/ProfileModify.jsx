import { useSelector } from 'react-redux';
import styled from 'styled-components';

import PhoneOutLine from '../UI/PhoneOutLine';
import ModifyInputBoxList from './ModifyInputBoxList';
import BackgroundModifyBox from './common/BackgroundModifyBox';
import { useState } from 'react';

const ProfileModify = () => {
  const user = useSelector((state) => state.auth.user);
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <PhoneOutLine style={{ margin: '0' }}>
      <ProfileContainer>
        <BackgroundModifyBox
          user_id={user.user_id}
          image={user.profile_img}
          isSubmit={isSubmit}
        />
        <ModifyInputBoxList setIsSubmit={setIsSubmit} />
      </ProfileContainer>
    </PhoneOutLine>
  );
};

export default ProfileModify;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 95%;
  padding: 2rem 0;
`;
