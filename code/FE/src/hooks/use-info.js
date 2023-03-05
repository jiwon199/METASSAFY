import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loginSlice } from '../store/slice/authSlice';
import { getJsonLocalUserInfo } from '../utils/local-storage';

// 페이지 렌더링 시, 리덕스에서 자신의 유저 정보 가져오기
function useInfo() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const info = getJsonLocalUserInfo();
    dispatch(loginSlice(info));
  }, []);

  return user;
}

export default useInfo;
