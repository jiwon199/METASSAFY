import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useInput from '../../../hooks/use-input';
import AuthInput from '../AuthInput';
import ExistCheckButton from './ExistCheckButton';
import RegisterSelectorInfo from './RegisterSelectInfo';
import SubmitButton from '../SubmitButton';

import { fetchRegister } from '../../../services/auth-service';
import styled from 'styled-components';

const isNotEmpty = (value) => value.trim() !== '';
const isValidId = (isExist, preId, value) => {
  return value && value.trim() !== '' && preId === value && !isExist;
};
const isSamePassword = (value, copy) =>
  value.trim() !== '' && value.trim() === copy.trim();
const isEmailType = (value) => value.trim() !== '' && value.includes('@');

const RegisterForm = (props) => {
  const navigate = useNavigate();
  const [generation, setGeneration] = useState('');
  const [area, setArea] = useState('');
  const [isExistId, setIsExistId] = useState(true);
  const [preId, setPreId] = useState('');

  const {
    value: userIdValue,
    isValid: userIdIsValid,
    hasError: userIdHasError,
    valueChangeHandler: userIdChangeHandler,
    inputBlurHandler: userIdBlurHandler,
    reset: resetUserId,
  } = useInput(isValidId.bind(null, isExistId, preId));

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

  const {
    value: userNameValue,
    isValid: userNameIsValid,
    hasError: userNameHasError,
    valueChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
    reset: resetUserName,
  } = useInput(isNotEmpty);

  const {
    value: userEmailValue,
    isValid: userEmailValueIsValid,
    hasError: userEmailHasError,
    valueChangeHandler: userEmailChangeHandler,
    inputBlurHandler: userEmailBlurHandler,
    reset: resetUserEmail,
  } = useInput(isEmailType);

  const {
    value: userStudentIdValue,
    isValid: userStudentIdIsValid,
    hasError: userStudentIdHasError,
    valueChangeHandler: userStudentIdChangeHandler,
    inputBlurHandler: userStudentIdBlurHandler,
    reset: resetUserStudentId,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (
    userIdIsValid &&
    userPasswordValueIsValid &&
    userRetryPasswordValueIsValid &&
    userNameIsValid &&
    userEmailValueIsValid &&
    userStudentIdIsValid &&
    generation &&
    area
  ) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    // 로그인 API
    const { data, error } = await fetchRegister({
      id: userIdValue,
      password: userPasswordValue,
      name: userNameValue,
      email: userEmailValue,
      studentId: userStudentIdValue,
      generation,
      area,
    });

    // 회원가입 성공 시 메인으로 이동
    if (data === 'Success') {
      resetUserId();
      resetUserPassword();
      resetUserRetryPassword();
      resetUserName();
      resetUserEmail();
      resetUserStudentId();
      navigate('/');
      return;
    }

    // 실패
    else if (data === 'Fail' || error) {
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <AuthInput
          label="아이디"
          type="text"
          id="userId"
          placeholder="아이디 입력"
          value={userIdValue}
          onChange={userIdChangeHandler}
          onBlur={userIdBlurHandler}
          hasError={userIdHasError}
          errorText="아이디 확인이 필요합니다."
          marginBottom="0.1rem"
          color="#617485"
        />
        <ExistCheckButton
          value={userIdValue}
          setPreId={setPreId}
          setExist={setIsExistId}
        />
        <AuthInput
          label="비밀번호"
          type="password"
          id="userPassword"
          placeholder="비밀번호 입력"
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
        <AuthInput
          label="이름"
          type="text"
          id="userName"
          placeholder="이름 입력"
          value={userNameValue}
          onChange={userNameChangeHandler}
          onBlur={userNameBlurHandler}
          hasError={userNameHasError}
          errorText="필수 입력입니다."
          marginBottom="0.3rem"
          color="#617485"
        />
        <AuthInput
          label="본인 확인 이메일"
          type="text"
          id="userEmail"
          placeholder="이메일 입력"
          value={userEmailValue}
          onChange={userEmailChangeHandler}
          onBlur={userEmailBlurHandler}
          hasError={userEmailHasError}
          errorText="이메일 형식이 아닙니다."
          color="#617485"
        />
        <RegisterSelectorInfo
          type="text"
          id="userStudentId"
          placeholder="학번"
          value={userStudentIdValue}
          onChange={userStudentIdChangeHandler}
          onBlur={userStudentIdBlurHandler}
          hasError={userStudentIdHasError}
          errorText="필수 입력입니다."
          setGeneration={setGeneration}
          setArea={setArea}
        />
      </div>
      <WhiteDiv />
      <SubmitButton height="2.8rem">회원가입</SubmitButton>
    </form>
  );
};

export default RegisterForm;

const WhiteDiv = styled.div`
  height: 3rem;
`;
