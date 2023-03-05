import styled from 'styled-components';
import useScrollFadeIn from '../../hooks/use-scroll-fade-in';

function SecondItem({ direction, content }) {
  const animatedItem = useScrollFadeIn('up', 1, 0);

  return (
    <WrapperStyle direction={direction} {...animatedItem}>
      <TextDivStyle>
        <TitleStyle>{content.title}</TitleStyle>
        <ContentStyle>{content.content}</ContentStyle>
      </TextDivStyle>
      <ImgDivStyle>
        <ImgStyle src={content.img} alt="소개 이미지" />
      </ImgDivStyle>
    </WrapperStyle>
  );
}

export default SecondItem;

const WrapperStyle = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => props.direction || 'column'};
  background-color: aliceblue;
  border-radius: 25px;
`;

const TextDivStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleStyle = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const ContentStyle = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const ImgDivStyle = styled.div`
  width: 100%;
  height: 19rem;
  margin: 1rem 0;
`;

const ImgStyle = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  /* object-fit: contain; */
`;
