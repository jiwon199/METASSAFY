import { Navigate, Outlet } from 'react-router-dom';

import isLogin from './isLogin';

// 로그인 여부 상관없이 모두 열람 가능한 페이지
// 로그인했으면 볼 수 없는 로그인, 회원가입 페이지는 메인페이지로 redirect
const PublicRoute = () => {
  return isLogin() ? <Navigate to="/metassafy" /> : <Outlet />;
};

export default PublicRoute;
