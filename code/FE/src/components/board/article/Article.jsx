import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { fetchBoardGet } from '../../../services/board-service';
import ArticleInfo from './ArticleInfo';
import Comments from '../comment/Comments';

const Article = () => {
  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    const getArticle = async () => {
      const { data } = await fetchBoardGet(id, user.user_id);
      setArticle(data);
    };
    if (user.user_id) {
      getArticle();
    }
  }, [user, id]);

  return (
    <ArticleSection>
      <TitleDiv>{article.title}</TitleDiv>
      <ArticleInfo article={article}></ArticleInfo>
      <HrStyle />
      <Comments
        user_id={user.user_id}
        article_no={article.article_no}
      ></Comments>
    </ArticleSection>
  );
};

export default Article;

const ArticleSection = styled.section`
  width: 90%;
  max-width: 1000px;
  height: 100%;
  margin-top: 2rem;
`;

const TitleDiv = styled.div`
  width: 100%;
  background-color: #e0f4ff;
  height: 2.2rem;
  border-radius: 20px;
  font-size: 1.2rem;
  padding: 0.5rem 1.3rem;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.132);
  color: #617485;
`;

const HrStyle = styled.hr`
  background-color: #ced4da;
  border: none;
  height: 0.1px;
  margin: 1rem 0;
`;
