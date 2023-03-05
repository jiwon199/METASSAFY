import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { logoutProcess } from '../../services/auth-service';
import { loginSlice } from '../../store/slice/authSlice';

function MainNavigation() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [isScroll, setIsScroll] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.pageYOffset > 0) {
      setIsScroll(true);
    }
    if (window.pageYOffset === 0) {
      setIsScroll(false);
    }
  }, []);

  const logout = () => {
    logoutProcess();
    // 리덕스에서 삭제
    dispatch(loginSlice(null));
  };

  useEffect(() => {
    window.addEventListener('mousewheel', handleScroll);
    return () => {
      window.removeEventListener('mousewheel', handleScroll);
    };
  }, [handleScroll]);

  return (
    <HeaderStyle isScroll={isScroll}>
      <HeaderWrapper>
        <LogoStyle>
          <NavLink to="/">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                alt="MetaSSAFY logo"
                src="images/logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              METASSAFY
            </div>
          </NavLink>
        </LogoStyle>
        <nav>
          <UlStyle isScroll={isScroll}>
            {user && (
              <li>
                <NavLink to="/metassafy">METASSAFY</NavLink>
              </li>
            )}
            <li>
              <NavLink to="/developers">개발팀</NavLink>
            </li>
            <li>
              <NavLink to="/board/list">게시판</NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/profile/${user?.user_id}`}>프로필</NavLink>
              </li>
            )}
            <li>
              {!user && <NavLink to="/login">로그인</NavLink>}
              {user && (
                <Link to="/" onClick={logout}>
                  로그아웃
                </Link>
              )}
            </li>
          </UlStyle>
        </nav>
      </HeaderWrapper>
    </HeaderStyle>
  );
}

export default MainNavigation;

const HeaderStyle = styled.header`
  position: fixed;
  background-color: ${(props) =>
    props.isScroll ? '#f0f8ffcc' : 'transparent'};
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  z-index: 10;
  @media screen and (max-width: 700px) {
    height: auto;
  }
`;

const HeaderWrapper = styled.div`
  width: 80%;
  min-width: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LogoStyle = styled.div`
  padding: 5px;
  & > a {
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: bold;
    color: black;
  }
`;

const UlStyle = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: baseline;
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }

  & > li {
    margin-right: 1rem;
    @media screen and (max-width: 700px) {
      margin-left: 10px;
      margin-bottom: 5px;
    }

    & > a {
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: bold;
      color: ${(props) => (props.isScroll ? '#646464' : 'black')};
      :hover {
        color: #b282d9;
      }
      :active {
        color: #ca97f3;
      }
    }
    & > a.active {
      color: #4f88cd;
    }
    & > a.active:hover {
      color: #ca97f3;
    }
  }
`;
