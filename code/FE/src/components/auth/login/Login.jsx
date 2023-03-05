import React from 'react';

import AuthModal from '../../UI/modal/AuthModal';
import AuthTitle from '../AuthTitle';
import LoginForm from './LoginForm';
import LoginBottom from './LoginBottom';
import AuthClose from './AuthClose';

const Login = (props) => {
  return (
    <AuthModal>
      <AuthClose onClose={props.onClose} />
      <AuthTitle title="METASSAFY!" subTitle="DIVE TO" />
      <LoginForm onClose={props.onClose} />
      <LoginBottom />
    </AuthModal>
  );
};

export default Login;
