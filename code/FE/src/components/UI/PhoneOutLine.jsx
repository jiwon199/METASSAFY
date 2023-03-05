import BackgroundBox from '../profile/common/BackgroundBox';
import MajorPositionClass from '../phone/MajorPositionClass';
import TextGroupComponent from '../profile/common/TextGroupComponent';
import styled from 'styled-components';

function PhoneOutLine(props) {
  return (
    <PhoneStyle>
      {props.children}
      {/* <PhoneNav /> */}
    </PhoneStyle>
  );
}

export default PhoneOutLine;

const PhoneStyle = styled.div`
  background-color: white;
  border-radius: 1rem;
  width: 22rem;
  height: 35rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  position: absolute;
  align-items: center;
  z-index: 10;
`;
