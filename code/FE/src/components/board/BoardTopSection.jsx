import styled from 'styled-components';
import background from '../../assets/images/board_background.png';

const BoardTopSection = () => {
  return (
    <SectionStyle>
      <br />
      <h1>Community</h1>
      <p>메타싸피인들의 소통 공간</p>
    </SectionStyle>
  );
};

export default BoardTopSection;

const SectionStyle = styled.section`
  background-color: white;
  height: 18rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #646464;
  font-weight: bold;
  position: relative;
  z-index: 1;

  &::after {
    opacity: 0.4;
    position: absolute;
    content: '';
    top: 0px;
    left: 0px;
    width: 100%;
    height: 18rem;
    background-image: url(${background});
    background-size: cover;
    z-index: -1;
  }

  & h1 {
    font-size: 2.5rem;
    margin-top: 3rem;
    margin-bottom: 0.4rem;
    position: relative;
    opacity: 1;
    z-index: 100;
  }

  & p {
    position: relative;
    z-index: 100;
  }
`;
