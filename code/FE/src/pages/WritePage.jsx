import styled from 'styled-components';

import BoardWrite from '../components/board/write/BoardWrite';

const WritePage = () => {
  return (
    <SectionStyle>
      <BoardWrite></BoardWrite>
    </SectionStyle>
  );
};

export default WritePage;

const SectionStyle = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
