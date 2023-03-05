import React from 'react';
import { useDispatch } from 'react-redux';

import { fetchLogin } from '../../../services/auth-service';
import { getJsonLocalUserInfo } from '../../../utils/local-storage';
import { loginSlice } from '../../../store/slice/authSlice';
import { useNavigate } from 'react-router-dom';

import useInput from '../../../hooks/use-input';
import AuthInput from '../AuthInput';
import SubmitButton from '../SubmitButton';

const isNotEmpty = (value) => value.trim() !== '';

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    value: userIdValue,
    isValid: userIdIsValid,
    hasError: userIdHasError,
    valueChangeHandler: userIdChangeHandler,
    inputBlurHandler: userIdBlurHandler,
    reset: resetuserId,
  } = useInput(isNotEmpty);

  const {
    value: userPasswordValue,
    isValid: userPasswordValueIsValid,
    hasError: userPasswordHasError,
    valueChangeHandler: userPasswordChangeHandler,
    inputBlurHandler: userPasswordBlurHandler,
    reset: resetuserPassword,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (userIdIsValid && userPasswordValueIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    // 로그인 API
    const { data } = await fetchLogin({
      id: userIdValue,
      password: userPasswordValue,
    });

    // 로그인 성공 시 모달 닫기
    if (data === 'Success') {
      // 리덕스에도 저장
      dispatch(loginSlice(getJsonLocalUserInfo()));
      // PublicRouter로 자동 이동됨
    } else {
      resetuserId();
      resetuserPassword();
      alert('로그인 실패: 아이디와 비밀번호를 확인해주세요.');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <AuthInput
          label="SSAFY 학번"
          type="text"
          id="userId"
          placeholder="SSAFY 학번 입력"
          value={userIdValue}
          onChange={userIdChangeHandler}
          onBlur={userIdBlurHandler}
          hasError={userIdHasError}
          errorText="필수 입력입니다."
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
        />
      </div>
      <SubmitButton>Let's GO!</SubmitButton>
    </form>
  );
};

export default LoginForm;
