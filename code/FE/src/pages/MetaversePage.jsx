import { Outlet } from 'react-router';
import styled from 'styled-components';
import MetaverseThree from './metaverse/MetaverseThree';

const MetaversePage = () => {
  return (
    <FlexDiv>
      <Outlet />
      <MetaverseThree />
    </FlexDiv>
  );
};

export default MetaversePage;

const FlexDiv = styled.div`
  position: relative;
`;
