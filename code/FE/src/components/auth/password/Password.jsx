import React from 'react';

import { fetchPasswordChange } from '../../../services/auth-service';
import { useNavigate } from 'react-router';

import useInput from '../../../hooks/use-input';
import AuthInput from '../AuthInput';
import SubmitButton from '../SubmitButton';

import styled from 'styled-components';
import { useSelector } from 'react-redux';

const isNotEmpty = (value) => value.trim() !== '';
const isSamePassword = (value, copy) =>
  value.trim() !== '' && value.trim() === copy.trim();

const Password = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const {
    value: userPasswordValue,
    isValid: userPasswordValueIsValid,
    hasError: userPasswordHasError,
    valueChangeHandler: userPasswordChangeHandler,
    inputBlurHandler: userPasswordBlurHandler,
    reset: resetUserPassword,
  } = useInput(isNotEmpty);

  const {
    value: userRetryPasswordValue,
    isValid: userRetryPasswordValueIsValid,
    hasError: userRetryPasswordHasError,
    valueChangeHandler: userRetryPasswordChangeHandler,
    inputBlurHandler: userRetryPasswordBlurHandler,
    reset: resetUserRetryPassword,
  } = useInput(isSamePassword.bind(null, userPasswordValue));

  let formIsValid = false;
  if (userPasswordValueIsValid && userRetryPasswordValueIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    // 비밀번호 변경 API
    const { data, error } = await fetchPasswordChange({
      id: user.user_id,
      password: userPasswordValue,
      genderF: user.genderF,
    });

    // 비밀번호 변경 성공 시 메인 페이지로
    if (data === 'Success') {
      // 리덕스에도 저장
      //   dispatch(loginSlice(getJsonLocalUserInfo()));
      resetUserPassword();
      resetUserRetryPassword();
      alert('비밀번호가 변경되었습니다.');
      navigate('/');
    } // 실패
    else if (data === 'Fail' || error) {
      alert('비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <DivStyle>
        <AuthInput
          label="변경할 비밀번호"
          type="password"
          id="userPassword"
          placeholder="변경할 비밀번호 입력"
          value={userPasswordValue}
          onChange={userPasswordChangeHandler}
          onBlur={userPasswordBlurHandler}
          hasError={userPasswordHasError}
          errorText="필수 입력입니다."
          marginBottom="0.3rem"
          color="#617485"
        />
        <AuthInput
          label="비밀번호 재확인"
          type="password"
          id="userRetryPassword"
          placeholder="비밀번호 입력"
          value={userRetryPasswordValue}
          onChange={userRetryPasswordChangeHandler}
          onBlur={userRetryPasswordBlurHandler}
          hasError={userRetryPasswordHasError}
          errorText="비밀번호가 일치하지 않습니다."
          marginBottom="0.65rem"
          color="#617485"
        />
      </DivStyle>
      <SubmitButton>비밀번호 변경하기</SubmitButton>
    </form>
  );
};

export default Password;

const DivStyle = styled.div`
  margin: 1rem 0;
  height: 11rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
