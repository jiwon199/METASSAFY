import styled from 'styled-components';
import { TbUsers, TbUserPlus, TbUserCheck, TbUserSearch } from 'react-icons/tb';

const FriendListBar = ({
  onClickPage,
  onClickRequest,
  onClickSearch,
  onClickSendRequest,
  show,
}) => {
  return (
    <ButtonBarStyle>
      <IconButtonStyle
        onClick={onClickPage}
        width={show.Page ? '10rem' : '2rem'}
      >
        <FlexDiv>
          <TbUsers color="#617485" style={{ marginTop: '0.5rem' }} />
          {show.Page && <CheckNameSpan>친구 목록</CheckNameSpan>}
        </FlexDiv>
      </IconButtonStyle>
      <IconButtonStyle
        onClick={onClickRequest}
        width={show.Request ? '10rem' : '2rem'}
      >
        <FlexDiv>
          <TbUserPlus color="#617485" style={{ marginTop: '0.5rem' }} />
          {show.Request && <CheckNameSpan>받은 친구 요청</CheckNameSpan>}
        </FlexDiv>
      </IconButtonStyle>
      <IconButtonStyle
        onClick={onClickSendRequest}
        width={show.SendRequest ? '10rem' : '2rem'}
      >
        <FlexDiv>
          <TbUserCheck color="#617485" style={{ marginTop: '0.5rem' }} />
          {show.SendRequest && <CheckNameSpan>보낸 친구 요청</CheckNameSpan>}
        </FlexDiv>
      </IconButtonStyle>
      <IconButtonStyle
        onClick={onClickSearch}
        width={show.Search ? '10rem' : '2rem'}
      >
        <FlexDiv>
          <TbUserSearch color="#617485" style={{ marginTop: '0.5rem' }} />
          {show.Search && <CheckNameSpan>유저 검색</CheckNameSpan>}
        </FlexDiv>
      </IconButtonStyle>
    </ButtonBarStyle>
  );
};

export default FriendListBar;

const ButtonBarStyle = styled.div`
  border-radius: 20px;
  height: 2.5rem;
  position: relative;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 0.5rem;
  justify-content: space-between;
  display: flex;
`;

const IconButtonStyle = styled.div`
  background-color: #e0f4ff;
  border-radius: 3.6rem;
  display: inline-block;
  height: 2rem;
  width: ${(props) => props.width};
  position: relative;
  text-align: center;
  line-height: 2rem;
`;

const CheckNameSpan = styled.span`
  color: #617485;
  font-size: 0.9rem;
  padding: 0rem 0.5rem;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;
