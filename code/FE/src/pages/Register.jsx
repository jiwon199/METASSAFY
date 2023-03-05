import React from 'react';

import AuthTitle from '../components/auth/AuthTitle';
import RegisterForm from '../components/auth/register/RegisterForm';
import styled from 'styled-components';

const Register = () => {
  return (
    <SectionStyle>
      <WrapperStyle>
        <AuthTitle title="METASSAFY!" subTitle="WELCOME TO" />
        <RegisterForm />
      </WrapperStyle>
    </SectionStyle>
  );
};

export default Register;

const SectionStyle = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrapperStyle = styled.div`
  width: 350px;
`;
