import styled from 'styled-components';

import { fetchIsExistId } from '../../../services/auth-service';

const ExistCheckButton = (props) => {
  const checkHandler = async () => {
    if (!props.value) {
      return;
    }
    const { data } = await fetchIsExistId(props.value);
    props.setExist(data);
    props.setPreId(props.value);
  };

  return <ButtonStyle onClick={checkHandler}>중복 확인</ButtonStyle>;
};

export default ExistCheckButton;

const ButtonStyle = styled.button`
  width: 5.5rem;
  height: 1.9rem;
  background-color: #e0f4ff;
  color: #617485;
  font-size: 0.85rem;
  // font-family: 'korail_bold';
  border: none;
  border-radius: 7px;
  cursor: pointer;
  float: right;
  margin: -0.5rem 0 0.6rem 0;
`;
