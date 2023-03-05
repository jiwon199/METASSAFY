import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Heart from '../list/Heart';

const ArticleInfoWriter = ({ article }) => {
  const [likeNum, setLikeNum] = useState(article.like);
  const [isLike, setIsLike] = useState(article.my_like);
  const [isTouched, setIsTouched] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    if (!isTouched) {
      setLikeNum(article.like);
      setIsLike(article.my_like);
    }
    if (Object.keys(article).length) {
      setIsTouched(true);
    }
  }, [article]);

  return (
    <WrapperStyle>
      <DivStyle>
        <WriterStyle>
          <a
            href={`/profile/${article.user_id}`}
            target="_blank"
            style={{ textDecoration: 'none', color: 'black' }}
          >
            {article.name}
          </a>
        </WriterStyle>
        <TimeDivStyle>
          <TimeStyle>
            <div>작성 시간</div>
            {article.regtime}
          </TimeStyle>
          <TimeStyle>
            <div>수정 시간</div>
            {article.modtime}
          </TimeStyle>
        </TimeDivStyle>
      </DivStyle>
      <LikeDivStyle>
        <Heart
          type="1"
          no={article.article_no}
          isLike={isLike}
          setLikeNum={setLikeNum}
          setIsLike={setIsLike}
        />
        <p>{likeNum}</p>
      </LikeDivStyle>
    </WrapperStyle>
  );
};

export default ArticleInfoWriter;

const WrapperStyle = styled.div`
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

const DivStyle = styled.div`
  @media screen and (max-width: 500px) {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

const TimeDivStyle = styled.div`
  @media screen and (max-width: 500px) {
    display: flex;
  }
`;

const WriterStyle = styled.div`
  color: #799fc1;
  font-size: 1.2rem;
  margin-bottom: 0.9rem;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;
const TimeStyle = styled.div`
  color: #adb5bd;
  font-size: 0.8rem;
  margin-bottom: 0.4rem;
  @media screen and (max-width: 500px) {
    font-size: 0.3rem;
    margin-left: 0.4rem;
  }
`;

const LikeDivStyle = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  margin: 1rem 0 0 1rem;

  & button svg {
    font-size: 1rem;
    margin-right: 0.6rem;
  }

  & p {
    color: red;
  }
`;
