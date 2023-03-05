import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUserInfoById } from '../services/auth-service';
import { otherUserSlice } from '../store/slice/phoneSlice';

// 페이지 렌더링 시 리덕스에서 아이디가 user_id 유저 정보 가져오기
function useOtherFetch(user_id) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.phone.other);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await fetchUserInfoById(user_id);
      if (!error) {
        dispatch(otherUserSlice(data));
      }
    };
    fetchUser();
  }, []);

  return user;
}

export default useOtherFetch;
