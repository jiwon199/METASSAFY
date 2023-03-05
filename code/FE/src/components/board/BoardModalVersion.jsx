import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';

import BoardModal from '../UI/modal/BoardModal';

function BoardModalVersion() {
  const navigate = useNavigate();

  return (
    <BoardModal onBack={() => navigate(-1)} onClose={() => navigate('/unity')}>
      <SectionStyle>
        <Outlet />
      </SectionStyle>
    </BoardModal>
  );
}

export default BoardModalVersion;

const SectionStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 13px;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.3rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #617485;
    border-radius: 10px;
    background-clip: padding-box;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px transparent;
  }
`;
