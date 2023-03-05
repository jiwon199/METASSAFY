import { Navigate, Outlet } from 'react-router-dom';

import isLogin from './isLogin';

// 로그인한 유저에게만 라우팅
// 로그인하지 않았으면 (로그인 모달이 있는)메인페이지로 redirect
const PrivateRoute = ({ redirectPath = '/login' }) => {
  if (!isLogin()) {
    window.alert('로그인이 필요합니다.');
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
