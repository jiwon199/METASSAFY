import AuthTitle from '../components/auth/AuthTitle';
import LoginPageForm from '../components/auth/login/LoginPageForm';
import styled from 'styled-components';

export default function LoginPage() {
  return (
    <LoginPageStyle>
      <div style={{ width: '22rem' }}>
        {/* <AuthClose onClose={props.onClose} /> */}
        <AuthTitle title="METASSAFY!" subTitle="DIVE TO" />
        <LoginPageForm />
        {/* <LoginBottom /> */}
      </div>
    </LoginPageStyle>
  );
}

const LoginPageStyle = styled.div`
  /* background-color: white; */
  display: flex;
  justify-content: center;
`;
