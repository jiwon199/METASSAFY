import styled from 'styled-components';

import useScrollFadeIn from '../../hooks/use-scroll-fade-in';
import SecondItem from './SecondItem';
import { secondContent } from './content-text.js';

function SecondContent() {
  const animatedItem = useScrollFadeIn('up', 1, 0);

  return (
    <WrapperStyle>
      <TitleStyle {...animatedItem}>
        {secondContent.title}
        <p>{secondContent.subTitle}</p>
      </TitleStyle>
      <ContentStyle>
        <SecondItem content={secondContent.contents[0]} />
        <SecondItem content={secondContent.contents[1]} />
        <SecondItem content={secondContent.contents[2]} direction="row" />
      </ContentStyle>
    </WrapperStyle>
  );
}

export default SecondContent;

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

const ContentStyle = styled.ul`
  /* grid-template-columns: repeat(2, 1fr);
  gap: 5rem;
  padding: 0 5rem; */
  width: 100%;
  min-height: 45rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;

  & > div:nth-child(1) {
    grid-column: span 3;
  }

  & > div:nth-child(2) {
    grid-column: span 2;
  }

  & > div:nth-child(3) {
    grid-column: span 5;
  }
`;
