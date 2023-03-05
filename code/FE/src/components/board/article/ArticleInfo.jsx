import styled from 'styled-components';
import ArticleButtonWrapper from './ArticleButtonWrapper';
import ArticleInfoWriter from './ArticleInfoWriter';

const ArticleInfo = ({ article }) => {
  return (
    <SectionStyle style={{ width: '100%' }}>
      <ContentDivStyle>
        {/* <ImgStyle src={article.thumbnail} /> */}
        {article.files &&
          article.files.map((file, index) => {
            return <ImgStyle src={file.path} alt="content img" key={index} />;
          })}
        <TextStyle>{article.content}</TextStyle>
      </ContentDivStyle>
      <WriteInfoDivStyle>
        <ArticleInfoWriter article={article} />
        {!!article.my_article && (
          <ArticleButtonWrapper article_no={article.article_no} />
        )}
      </WriteInfoDivStyle>
    </SectionStyle>
  );
};

export default ArticleInfo;

const SectionStyle = styled.div`
  display: flex;
  padding: 1.5rem;
  @media screen and (max-width: 500px) {
    flex-flow: column-reverse;
  }
`;

const ContentDivStyle = styled.div`
  width: 85%;
  margin-right: 1rem;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const ImgStyle = styled.img`
  width: 100%;
  max-height: 18rem;
  border-radius: 16px;
  object-fit: contain;
  margin-bottom: 1rem;
`;

const TextStyle = styled.div`
  width: 100%;
  min-height: 5rem;
`;

const WriteInfoDivStyle = styled.div`
  width: 15%;
  min-width: 10rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  @media screen and (max-width: 500px) {
    width: 100%;
    padding: 0;
    margin-bottom: 1rem;
  }
`;
