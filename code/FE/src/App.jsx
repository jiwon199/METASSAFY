import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import PublicRoute from './libs/PublicRoute';
import PrivateRoute from './libs/PrivateRoute';

import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage';
import PhonePage from './pages/PhonePage';
import Register from './pages/Register';
import ProfileModify from './components/profile/ProfileModify';
import BoardPage from './pages/BoardPage';
import ProfilePage from './pages/ProfilePage';
import WebProfilePage from './pages/WebProfilePage';
import WebProfileModify from './pages/WebProfileModify';
import DevelopersPage from './pages/DevelopersPage';
import LoginPage from './pages/LoginPage';
import UnityPage from './pages/UnityPage';
import OpenViduPage from './pages/OpenViduPage';

import useInfo from './hooks/use-info';
import PhoneChatingList from './pages/phone_pages/PhoneChatingList';
import PhoneChatingRoom from './pages/phone_pages/PhoneChatingRoom';
import MetaversePage from './pages/MetaversePage';
import PhoneFriendPage from './pages/phone_pages/PhoneFriendPage';
import PhoneChatEdit from './pages/phone_pages/PhoneChatEdit';
import ArticlePage from './pages/ArticlePage';
import WritePage from './pages/WritePage';
import { useSelector } from 'react-redux';
import PhoneHomePage from './pages/phone_pages/PhoneHomePage';
import PhoneApp from './pages/phone_pages/PhoneApp';
import NotFound from './pages/NotFound';
import BoardModalVersion from './components/board/BoardModalVersion';
import BoardOuter from './components/board/BoardOuter';
import PasswordPage from './components/auth/password/PasswordPage';

function App() {
  useInfo();
  const user = useSelector((state) => state.auth.user);

  return (
    <AppContainer>
      <BlockBox>
        <p style={{ fontSize: '20px', position: 'absolute' }}>
          METASSAFY는
          <br />
          PC에서 즐거운 경험을 제공합니다.
        </p>
      </BlockBox>
      <Routes>
        {/* Navbar */}
        <Route element={<Layout />}>
          {/* 일반 라우터 */}
          <Route path="/" element={<MainPage />} />
          <Route path="developers" element={<DevelopersPage />} />
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          {/* 로그인 필요한 라우터 */}
          <Route path="/" element={<PrivateRoute />}>
            {/* 실제 서비스 페이지 */}
            <Route path="password" element={<PasswordPage />} />
            <Route path="board/" element={<BoardOuter />}>
              <Route path="list" element={<BoardPage />} />
              <Route path=":id" element={<ArticlePage />} />
              <Route path="write" element={<WritePage />} />
              <Route path="write/:id" element={<WritePage />} />
            </Route>
            <Route
              path="profile/:user_id"
              element={<WebProfilePage user_id={user?.user_id} />}
            />
            <Route path="profile/modify" element={<WebProfileModify />} />
            <Route path="metassafy/" element={<MetaversePage />}>
              <Route path="videochat/" element={<OpenViduPage />} />
              <Route path="phone/" element={<PhonePage />}>
                <Route path="home" element={<PhoneHomePage />} />
                <Route path="app" element={<PhoneApp />} />
                <Route
                  path="profile/:user_id"
                  element={<ProfilePage user_id={user?.user_id} />}
                />
                <Route
                  path="profile/modify"
                  element={<ProfileModify />}
                ></Route>
                <Route path="chat/" element={<PhoneChatingList />} />
                <Route path="chat/room/:id" element={<PhoneChatingRoom />} />
                <Route path="chat/room/:id/edit" element={<PhoneChatEdit />} />
                <Route path="friend" element={<PhoneFriendPage />}></Route>
              </Route>
            </Route>
          </Route>
        </Route>
        {/* Navbar 제외 */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/register" element={<Register />} />

          <Route path="unity" element={<UnityPage />}>
            <Route path="videochat/" element={<OpenViduPage />} />
            <Route path="phone/" element={<PhonePage />}>
              <Route path="home" element={<PhoneHomePage />} />
              <Route path="app" element={<PhoneApp />} />
              <Route
                path="profile/:user_id"
                element={<ProfilePage user_id={user?.user_id} />}
              />
              <Route path="openvidu-page" element={<OpenViduPage />} />
              <Route path="profile/modify" element={<ProfileModify />} />
              <Route path="chat/" element={<PhoneChatingList />} />
              <Route path="chat/room/:id" element={<PhoneChatingRoom />} />
              <Route path="chat/room/:id/edit" element={<PhoneChatEdit />} />
              <Route path="friend" element={<PhoneFriendPage />}></Route>
            </Route>
            <Route path="board/" element={<BoardModalVersion />}>
              <Route path="list" element={<BoardPage />} />
              <Route path=":id" element={<ArticlePage />} />
              <Route path="write" element={<WritePage />} />
              <Route path="write/:id" element={<WritePage />} />
            </Route>
          </Route>
        </Route>
        {/* 404 */}
        <Route element={<Layout />}>
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppContainer>
  );
}

export default App;

const BlockBox = styled.div`
  display: none;

  @media (max-width: 992px) {
    display: flex;
    position: fixed;
    z-index: 9999;
    width: 100%;
    height: 100%;
    padding: 3rem;
    justify-content: center;
    align-items: center;
    font-size: 300%;
    color: var(--white);
    background-color: white;
  }
`;

const AppContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 0;
`;
