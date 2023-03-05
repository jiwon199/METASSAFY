import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUserInfo } from '../services/auth-service';
import { loginSlice } from '../store/slice/authSlice';
import { getJsonLocalUserInfo } from '../utils/local-storage';

// 유저 정보 새로 요청한 후 리덕스에 자신의 유저 정보 저장하고 가져오기
function useMyFetch() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUser = async () => {
      const { error } = await fetchUserInfo();
      if (!error) {
        const info = getJsonLocalUserInfo();
        dispatch(loginSlice(info));
      }
    };
    fetchUser();
  }, []);

  return user;
}

export default useMyFetch;
