import styled from 'styled-components';
import Dropdown from '../Dropdown';

const generationList = ['9기', '8기', '7기', '6기'];
const areaList = ['서울', '대전', '구미', '광주', '부울경'];

const RegisterSelectorInfo = (props) => {
  return (
    <DivStyle>
      <LabelStyle>SSAFY 정보</LabelStyle>
      <DropdownBoxStyle>
        <Dropdown
          title="기수"
          list={generationList}
          setInfo={props.setGeneration}
        />
        <Dropdown title="지역" list={areaList} setInfo={props.setArea} />
        <InputStyle {...props} />
      </DropdownBoxStyle>
    </DivStyle>
  );
};

export default RegisterSelectorInfo;

const DivStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const LabelStyle = styled.label`
  font-size: 0.75rem;
  margin-bottom: 4px;
  font-family: korail_bold;
  color: #617485;
`;

const DropdownBoxStyle = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2.2rem;
`;

const InputStyle = styled.input`
  width: 6.5rem;
  height: 100%;
  border-width: 1px;
  border-color: ${(props) => (props.hasError ? '#FDA29B' : '#CED4DA')};
  border-radius: 5px;
  padding: 0.5rem;
  border-style: solid;
  font-family: korail_light;
  font-size: 0.85rem;
  color: 868e96;
  &:focus {
    outline: none;
  }
`;
