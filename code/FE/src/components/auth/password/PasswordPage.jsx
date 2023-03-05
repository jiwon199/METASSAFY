import React from 'react';

import AuthTitle from '../AuthTitle';
import Password from './Password';
import styled from 'styled-components';

const PasswordPage = () => {
  return (
    <PasswordPageStyle>
      <div style={{ width: '22rem', margin: '0' }}>
        <AuthTitle title="METASSAFY!" subTitle="DIVE TO" />
        <Password />
      </div>
    </PasswordPageStyle>
  );
};

export default PasswordPage;

const PasswordPageStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
`;
