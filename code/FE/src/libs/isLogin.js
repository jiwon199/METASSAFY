import { getLocalAccessToken } from '../utils/local-storage';

// accessToken 존재 여부에 따라 로그인 상태 판별
const isLogin = () => !!getLocalAccessToken();

export default isLogin;
