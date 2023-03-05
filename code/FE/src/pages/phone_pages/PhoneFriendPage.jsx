import { useState } from 'react';
//import Phone from '../../components/UI/Phone';
import styled from 'styled-components';

import FriendList from '../../components/phone/friend/FriendList';
import MyProfile from '../../components/phone/friend/MyProfile';
import FriendButtonBar from '../../components/phone/friend/FriendButtonBar';
import FriendRequest from '../../components/phone/friend/FriendRequest';
import FriendSendRequest from '../../components/phone/friend/FriendSendRequest';
import FriendSearch from '../../components/phone/friend/FriendSearch';
import RecommendButton from '../../components/phone/friend/RecommendButton';
import RecommendList from '../../components/phone/friend/RecommendList';

function PhoneFriendPage() {
  const [show, setShow] = useState({
    Page: true,
    Request: false,
    SendRequest: false,
    Search: false,
  });

  const onClickPage = () => {
    setShow({
      Page: true,
      Request: false,
      SendRequest: false,
      Search: false,
    });
  };

  const onClickRequest = () => {
    setShow({
      Page: false,
      Request: true,
      SendRequest: false,
      Search: false,
    });
  };

  const onClickSendRequest = () => {
    setShow({
      Page: false,
      Request: false,
      SendRequest: true,
      Search: false,
    });
  };

  const onClickSearch = () => {
    setShow({
      Page: false,
      Request: false,
      SendRequest: false,
      Search: true,
    });
  };

  return (
    <>
      <PhoneFriendPageStyle>
        <MyProfile />
        <FriendButtonBar
          show={show}
          onClickPage={onClickPage}
          onClickRequest={onClickRequest}
          onClickSearch={onClickSearch}
          onClickSendRequest={onClickSendRequest}
        />
        <FriendListStyle>
          {show.Page && <FriendList />}
          {show.Request && <FriendRequest />}
          {show.SendRequest && <FriendSendRequest />}
          {show.Search && (
            <StyledDiv>
              <FriendSearch />
              <RecommendButton />
              <RecommendList />
            </StyledDiv>
          )}
        </FriendListStyle>
      </PhoneFriendPageStyle>
    </>
  );
}

export default PhoneFriendPage;

const PhoneFriendPageStyle = styled.div`
  padding: 1rem;
  height: 100%;
`;

const FriendListStyle = styled.div`
  padding: 1rem;
  border-radius: 1rem 1rem 1rem 0rem;
  height: 23rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
    height: 10px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: #e0f4ff;
    border-radius: 6px;
  }
`;

const StyledDiv = styled.div`
  /* padding: 1rem; */
  border-radius: 1rem 1rem 1rem 0rem;
`;
