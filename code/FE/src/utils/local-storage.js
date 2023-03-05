export const setLocalTokens = (headers) => {
  localStorage.setItem('ACCESS_TOKEN', headers['jwt-auth-token']);
  localStorage.setItem('REFRESH_TOKEN', headers['jwt-refresh-token']);
};

export const removeAllLocal = () => {
  localStorage.clear();
};

export const getLocalAccessToken = () => {
  return localStorage.getItem('ACCESS_TOKEN');
};

export const setLocalAccessToken = (accessToken) => {
  localStorage.setItem('ACCESS_TOKEN', accessToken);
};

export const getLocalRefreshToken = () => {
  return localStorage.getItem('REFRESH_TOKEN');
};

export const setLocalRefreshToken = (refreshToken) => {
  localStorage.setItem('REFRESH_TOKEN', refreshToken);
};

export const getJsonLocalUserInfo = () => {
  return JSON.parse(localStorage.getItem('USER'));
};

export const getLocalUserInfo = () => {
  return localStorage.getItem('USER');
};

export const setLocalUserInfo = (userInfo) => {
  localStorage.setItem('USER', JSON.stringify(userInfo));
};
