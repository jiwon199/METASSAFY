import DevelopersList from '../components/developers/DevelopersList';
import dev from '../assets/images/dev.mp4';

import styled from 'styled-components';

export default function DevelopersPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <VideoStyle loop muted autoPlay>
        <source type="video/mp4" src={dev} />
      </VideoStyle>
      <DevelopersList />
    </div>
  );
}

const VideoStyle = styled.video`
  width: 100%;
  height: 80vh;
  border: none;
  outline: none;
  object-fit: fill;
`;
