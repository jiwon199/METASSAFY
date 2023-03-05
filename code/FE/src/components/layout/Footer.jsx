import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Footer() {
  return (
    <SectionStyle>
      <FooterWrapper>
        <LogoStyle>
          <LogoDivStyle>
            <img
              alt="MetaSSAFY logo"
              src="images/logo.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />
            METASSAFY
          </LogoDivStyle>
        </LogoStyle>
        <LinkWrapperStyle>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <LinkColumnStyle>
              <p>서비스</p>
              <Link to="/metassafy">메타싸피</Link>
              <Link to="/developers">개발팀</Link>
            </LinkColumnStyle>
            <LinkColumnStyle>
              <p style={{ marginTop: '1rem' }}></p>
              <Link to="/board/list">게시판</Link>
              <Link to="/unity">캠퍼스로</Link>
            </LinkColumnStyle>
            <LinkColumnStyle>
              <p>문의</p>
              <Link to="https://github.com/D211ER/PJT">깃허브</Link>
              <Link>이메일: D211ER@gmail.com</Link>
              <Link>전화: 02-3429-5100</Link>
            </LinkColumnStyle>
          </div>
        </LinkWrapperStyle>
      </FooterWrapper>
      <CopyDivStyle>
        <p>
          본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재, 복사, 배포
          등을 금합니다.
        </p>
        <p>Copyright © D211ER All Rights Reserved.</p>
      </CopyDivStyle>
    </SectionStyle>
  );
}

export default Footer;

const SectionStyle = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
  padding: 3rem 0;
`;

const FooterWrapper = styled.div`
  width: 1200px;
  min-height: 8rem;
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
  /* background-color: blue; */
`;

const LogoStyle = styled.div`
  width: 25%;
  padding: 0 5px;
  cursor: pointer;
`;

const LogoDivStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.5rem;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
`;

const LinkWrapperStyle = styled.div`
  width: 75%;
`;

const LinkColumnStyle = styled.div`
  display: flex;
  flex-direction: column;

  & p {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
  }
  & a,
  & a:link,
  & a:visited {
    text-decoration: none;
    color: #646464;
    margin-bottom: 0.5rem;
  }
`;

const CopyDivStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #bebdbd;
`;
