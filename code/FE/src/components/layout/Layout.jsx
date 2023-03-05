import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MainNavigation from './MainNavigation';

function Layout(props) {
  return (
    <section>
      <MainNavigation />
      <MainStyle>
        <Outlet />
      </MainStyle>
    </section>
  );
}

export default Layout;

const MainStyle = styled.main`
  min-height: 100vh;
  width: 100%;
  padding-top: 4rem;
`;
