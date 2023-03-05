import styled from 'styled-components';

const RecommendButton = () => {
  return (
    <RecommendStyle>
      <StyledP>
        <strong>추천 친구</strong>
      </StyledP>
    </RecommendStyle>
  );
};

export default RecommendButton;

const RecommendStyle = styled.div`
  background-color: #e0f4ff;
  border-radius: 3.6rem;
  margin-top: 1rem;
  display: flex;
  height: 2rem;
  position: relative;
  text-align: center;
  line-height: 2rem;
  color: #617485;
`;

const StyledP = styled.p`
  text-align: start;
  color: #617485;
  font-size: 0.9rem;
  margin-left: 1rem;
`;
