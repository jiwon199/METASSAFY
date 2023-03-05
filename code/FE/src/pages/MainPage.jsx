import styled from 'styled-components';

import MainImage from '../components/main/MainImage';
import FirstContent from '../components/main/FirstContent';
import SecondContent from '../components/main/SecondContent';
import Footer from '../components/layout/Footer';

function MainPage() {
  return (
    <SectionStyle>
      <MainImage />
      <WrapperStyle>
        <FirstContent />
        <SecondContent />
      </WrapperStyle>
      <Footer />
    </SectionStyle>
  );
}

export default MainPage;

const SectionStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
`;

const WrapperStyle = styled.div`
  width: 1200px;
`;
