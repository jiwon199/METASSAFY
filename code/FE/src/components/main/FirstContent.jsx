import styled from 'styled-components';

import useScrollFadeIn from '../../hooks/use-scroll-fade-in';
import FirstItem from './FirstItem';
import { firstContent } from './content-text.js';

function FirstContent() {
  const animatedItem = useScrollFadeIn('up', 1, 0);

  return (
    <WrapperStyle>
      <TitleStyle {...animatedItem}>
        {firstContent.title}
        <p>{firstContent.subTitle}</p>
      </TitleStyle>
      <ContentStyle>
        <FirstItem content={firstContent.contents[0]} />
        <FirstItem content={firstContent.contents[1]} />
        <FirstItem content={firstContent.contents[2]} direction="row" />
      </ContentStyle>
    </WrapperStyle>
  );
}

export default FirstContent;

const WrapperStyle = styled.div`
  margin: 10rem 0;
  padding: 3rem;
  width: 100%;
  min-height: 50rem;
`;

const TitleStyle = styled.div`
  font-size: 3.5rem;
  margin-bottom: 2.5rem;
  white-space: pre-wrap;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 900;
  & p {
    margin-top: 0.5rem;
    font-size: 1.5rem;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
  }
`;

const ContentStyle = styled.div`
  width: 100%;
  min-height: 45rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  & > div:nth-child(3) {
    grid-column: span 2;
  }
`;
