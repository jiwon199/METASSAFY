import styled from 'styled-components';
import Article from '../components/board/article/Article';

const ArticlePage = () => {
  return (
    <SectionStyle>
      <Article></Article>
    </SectionStyle>
  );
};

export default ArticlePage;

const SectionStyle = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;
  @media screen and (max-width: 500px) {
    margin-top: 0;
  }
`;
