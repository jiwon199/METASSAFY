import styled from 'styled-components';

import background from '../../assets/images/main/main_hi.mp4';

const MainImage = () => {
  return (
    <VideoStyle loop muted autoPlay>
      <source type="video/mp4" src={background} />
    </VideoStyle>
  );
};

export default MainImage;

// const ImgWrapperStyle = styled.div`
//   width: 100%;
//   height: 100vh;
//   background-image: url(${background});
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;
//   z-index: -1;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const TitleStyle = styled.div`
//   margin-bottom: 20vh;
//   font-size: 4.5rem;
//   font-family: Impact, Charcoal, sans-serif;
// `;

const VideoStyle = styled.video`
  width: 100%;
  height: 100vh;
  border: none;
  outline: none;
  object-fit: fill;
`;
