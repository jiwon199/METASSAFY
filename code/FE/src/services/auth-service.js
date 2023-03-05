import API from '../utils/api';
import {
  getLocalAccessToken,
  setLocalTokens,
  setLocalUserInfo,
  removeAllLocal,
  getLocalRefreshToken,
} from '../utils/local-storage';

const loginProcess = async (headers) => {
  // localStorage에 토큰 저장 && 헤더에 토큰 저장
  setLocalTokens(headers);
  API.defaults.headers['jwt-auth-token'] = getLocalAccessToken();
  API.defaults.headers['jwt-refresh-token'] = getLocalRefreshToken();
  // localStorage에 유저 정보 저장
  await fetchUserInfo();
};

export const logoutProcess = () => {
  // localStorage 삭제 && 헤더에 토큰 삭제
  removeAllLocal();
  delete API.defaults.headers['jwt-auth-token'];
  delete API.defaults.headers['jwt-refresh-token'];
};

export const fetchLogin = async ({ id, password }) => {
  const requestBody = {
    user_id: id,
    user_pwd: password,
  };

  try {
    const response = await API.post('/user/login', requestBody);
    const { data, status } = response;
    if (data === 'Success') {
      await loginProcess(response.headers); // 토큰 저장
    }
    return { data, status, error: null };
  } catch (error) {
    return { data: error.message, status: error.response.status, error };
  }
};

export const fetchRegister = async ({
  id,
  password,
  name,
  email,
  studentId,
  area,
}) => {
  const requestBody = {
    user_id: id,
    user_pwd: password,
    name: name,
    email: email,
    student_no: studentId,
    area: area,
  };

  try {
    const { data, status } = await API.post('/user/regist', requestBody);
    return { data, status, error: null };
  } catch (error) {
    return { data: error.message, status: error.response.status, error };
  }
};

export const fetchIsExistId = async (id) => {
  try {
    const { data, status } = await API.get(`/user/isExist/${id}`);
    return { data, status, error: null };
  } catch (error) {
    return { data: error.message, status: error.response.status, error };
  }
};

export const fetchUserInfo = async () => {
  try {
    const { data, status } = await API.get(`/user/auth/getUser`);
    if (status === 200) {
      setLocalUserInfo(data);
      return { data, status, error: null };
    }
    return { data, status, error: 'Fail' };
  } catch (error) {
    return { data: error.message, status: error.response?.status, error };
  }
};

export const fetchUserInfoById = async (id) => {
  try {
    const { data, status } = await API.get(`/user/auth/getUserById/${id}`);
    if (status === 200) {
      return { data, status, error: null };
    }
    return { data, status, error: 'Fail' };
  } catch (error) {
    return { data: error.message, status: error.response?.status, error };
  }
};

export const fetchPasswordChange = async ({ id, password, genderF }) => {
  const requestBody = {
    user_id: id,
    user_pwd: password,
    genderF,
  };

  try {
    const response = await API.post('/user/auth/update', requestBody);
    const { data, status } = response;
    return { data, status, error: null };
  } catch (error) {
    return { data: error.message, status: error.response.status, error };
  }
};
