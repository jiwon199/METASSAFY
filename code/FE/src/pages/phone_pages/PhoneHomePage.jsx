import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import alone from '../../assets/images/metassafy_alone.png';
import alone2 from '../../assets/images/metassafy_alone2.png';
import unity from '../../assets/images/metassafy_unity.png';
import unity2 from '../../assets/images/metassafy_unity2.png';
import main from '../../assets/images/main.png';
import main2 from '../../assets/images/main2.png';
import phoneCamera from '../../assets/images/camera.png';
import phoneCamera2 from '../../assets/images/camera2.png';
import cdefalut from '../../assets/images/defalut.png';
import cheese from '../../assets/images/camerad.png';
import { BiArrowBack } from 'react-icons/bi';
import { useState } from 'react';

function PhoneHomePage() {
  const navigate = useNavigate();
  const [camera, setCamera] = useState(false);

  function onCapture() {
    html2canvas(document.getElementById('react-unity-webgl-canvas-1'))
      .then((canvas) => {
        onSaveAs(canvas.toDataURL('image/png'), 'image-download.png');
        const captures = document.getElementById('captures');
        const isit = document.getElementById('capture');
        captures.removeChild(isit);
        canvas.id = 'capture';
        canvas.style.width = '100%';
        canvas.style.height = 'auto';
        captures.appendChild(canvas);
      })
      .catch((err) => console.log());
  }

  function onSaveAs(url, filename) {
    const link = document.createElement('a');

    document.body.appendChild(link);
    link.href = url;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div>
      {!camera && (
        <CenterDiv>
          <div>
            <ImgStyle
              onClick={() => {
                navigate('/');
              }}
              src={main}
              alt="main"
              onMouseEnter={(e) => (e.target.src = main2)}
              onMouseOut={(e) => (e.target.src = main)}
            />
          </div>
          <div>
            <ImgStyle
              onClick={() => {
                setCamera(true);
              }}
              src={phoneCamera}
              alt="phoneCamera"
              onMouseEnter={(e) => (e.target.src = phoneCamera2)}
              onMouseOut={(e) => (e.target.src = phoneCamera)}
            />
          </div>
          <div>
            <ImgStyle
              onClick={() => {
                navigate('/metassafy');
              }}
              src={alone}
              alt="metaAlone"
              onMouseEnter={(e) => (e.target.src = alone2)}
              onMouseOut={(e) => (e.target.src = alone)}
            />
          </div>
          <div>
            <ImgStyle
              onClick={() => {
                navigate('/unity');
              }}
              src={unity}
              alt="metaMulty"
              onMouseEnter={(e) => (e.target.src = unity2)}
              onMouseOut={(e) => (e.target.src = unity)}
            />
          </div>
        </CenterDiv>
      )}
      {camera && (
        <Center2Div>
          <ArrowDiv>
            <BiArrowBack
              style={{ float: 'right', margin: '2rem', cursor: 'pointer' }}
              onClick={() => setCamera(false)}
            />
          </ArrowDiv>
          <ImgDiv id="captures">
            <img
              src={cdefalut}
              alt="capture"
              id="capture"
              style={{ width: '100%', height: '100%' }}
            />
          </ImgDiv>
          <CameraImg src={cheese} alt="capture" onClick={onCapture} />
        </Center2Div>
      )}
    </div>
  );
}

export default PhoneHomePage;

const CenterDiv = styled.div`
  text-align: center;
  margin: 3rem;
`;

const Center2Div = styled.div`
  text-align: center;
`;

const ImgDiv = styled.div`
  width: 100%;
  height: auto;
  padding: 3rem 0rem 2rem 0rem;
`;

const ImgStyle = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 10%;
  margin: 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  :hover {
    width: 5.5rem;
    height: 5.5rem;
  }
`;

const CameraImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  :hover {
    cursor: pointer;
  }
`;

const ArrowDiv = styled.div`
  width: 100%;
  height: 3rem;
`;
