import { useState } from 'react';
import styled, { css } from 'styled-components';

import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const Dropdown = ({ list, title, setInfo, width }) => {
  const [active, setActive] = useState(false); // 리스트가 열려있는지 확인
  const [selected, setSelected] = useState(title); // 선택된 값을 selected에 담아 컴포넌트 간에 공유

  return (
    <SelectBoxStyle width={width}>
      <SelectLabelStyle
        width={width}
        value={selected}
        onClick={() => setActive(!active)}
      >
        {selected}
        {!active && <BsChevronDown className="icon" />}
        {active && <BsChevronUp className="icon" />}
      </SelectLabelStyle>
      <OptionListStyle active={active}>
        {list
          .filter((element) => element !== selected)
          .map((element) => (
            <OptionItemStyle
              key={element}
              onClick={() => {
                setActive(false);
                setSelected(element);
                setInfo(selected);
              }}
            >
              {element}
            </OptionItemStyle>
          ))}
      </OptionListStyle>
    </SelectBoxStyle>
  );
};

export default Dropdown;

const SelectBoxStyle = styled.div`
  position: relative;
  width: ${(props) => props.width || '6.5rem'};
  height: 100%;
  cursor: pointer;
`;

const SelectLabelStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0.8rem;
  font-size: 0.85rem;
  cursor: pointer;
  background-color: transparent;
  color: #868e96;
  border: none;
  border-radius: 5px;
  border: 1px solid #ced4da;

  .icon {
    color: '#868E96';
  }
`;

const activeExist = ({ active = true }) => {
  return `max-height: ${active ? '4.5rem' : '0'}`;
};

export const OptionListStyle = styled.ul`
  position: absolute;
  top: 2.3rem;
  width: 100%;
  ${activeExist};
  transition: 0.2s ease-in-out;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    // scrollbar의 배경부분 설정
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    // scrollbar의 bar 부분 설정
    border-radius: 1rem;
    background: #ced4da;
  }
  &::-webkit-scrollbar-button {
    // scrollbar의 상하단 위/아래 이동 버튼
    width: 0;
    height: 0;
  }

  &:not(:focus) {
    //
  }
`;

const OptionItemStyle = styled.li`
  background: #ffffff;
  box-sizing: border-box;
  padding: 0.8rem 1rem;
  transition: 0.3s;
  border: solid 1px #ced4da;
  border-radius: 5px;
  font-size: 0.85rem;
  color: #868e96;
  &:hover {
    color: white;
    background: #799fc0;
  }
`;
