import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Heart from './Heart';

const BoardCard = ({ card, setBoardList }) => {
  const date = new Date(card.regtime);
  const strDate =
    String(date.getFullYear()).slice(2, 4) +
    '.' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '.' +
    String(date.getDate()).padStart(2, '0');

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Link
        to={'../' + card.article_no}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <CardSection>
          <LikeDivStyle>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Heart
                type="1"
                no={card.article_no}
                isLike={card.my_like}
                setBoardList={setBoardList}
              />
              <p style={{ marginLeft: '0.3rem' }}>{card.like}</p>
            </div>
            <SubTitleStyle color="#AECBDB">조회수: {card.hit}</SubTitleStyle>
          </LikeDivStyle>
          {card.thumbnail ? (
            <ImgStyle src={card.thumbnail} alt="article img"></ImgStyle>
          ) : (
            <div style={{ height: '0.5rem' }}></div>
          )}
          <LineDivStyle>
            <TitleStyle>{card.title}</TitleStyle>
          </LineDivStyle>
          <LineDivStyle>
            <SubTitleStyle>
              {card.name} ({card.generation}기 / {card.area})
            </SubTitleStyle>
            <SubTitleStyle>{strDate}</SubTitleStyle>
          </LineDivStyle>
          <ContentStyle className="content">{card.content}</ContentStyle>
        </CardSection>
      </Link>
    </div>
  );
};

export default BoardCard;

const CardSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 14rem;
  /* min-height: 20rem; */
  padding: 0.8rem 1rem;
  margin: 0.3rem;
  background-color: white;
  border: 1px solid #9fc0dc56;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0px 0px 10px 2px #62b1cb84;

  &:hover {
    transform: scale(1.05);
    /* background-color: #aecbdb; */
  }
`;

const LikeDivStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.7rem;
`;

const ImgStyle = styled.img`
  width: auto;
  height: 12rem;
  margin: 0.3rem 0;
  /* border: 1px solid #4ea6f8a9; */
  border-radius: 8px;
  object-fit: cover;
`;

const LineDivStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.2rem 0;
`;

const TitleStyle = styled.section`
  font-size: 1.2rem;
  font-family: 'korail_bold';
`;

const SubTitleStyle = styled.section`
  color: ${(props) => props.color || '#adb5bd'};
  font-size: 0.7rem;
`;

const ContentStyle = styled.div`
  width: 100%;
  height: 1.2rem;
  color: #799fc0;
  font-size: 0.5rem;
  margin-top: 0.5rem;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;
