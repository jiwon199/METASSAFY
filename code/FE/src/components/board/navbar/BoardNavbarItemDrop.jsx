import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import BoardNavbarDropArea from './BoardNavbarDropArea';
import BoardNavbarDropSearch from './BoardNavbarDropSearch';
import { BiChevronDown } from 'react-icons/bi';

const BoardNavbarItemDrop = ({
  menu,
  index,
  activeIndex,
  setActiveIndex,
  setBoardList,
}) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (activeIndex !== index) {
      setIsShow(false);
    }
  }, [activeIndex]);

  // 넷바 클릭 시 드롭박스 보여주기
  const clickHandler = async () => {
    // button active css
    setActiveIndex(index);

    // 드롭박스 보여주기
    setIsShow(!isShow);
  };

  return (
    <LiStyle index={index} activeIndex={activeIndex} isShow={isShow}>
      <button onClick={clickHandler}>
        {menu.label}
        <BiChevronDown />
      </button>
      {isShow &&
        (menu.type === 'area' ? (
          <BoardNavbarDropArea type={menu.type} setBoardList={setBoardList} />
        ) : (
          <BoardNavbarDropSearch type={menu.type} setBoardList={setBoardList} />
        ))}
    </LiStyle>
  );
};

export default BoardNavbarItemDrop;

const LiStyle = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 1rem;
    width: 100%;
    height: 2rem;
    text-align: center;
    border: none;
    border-radius: 20px;
    background-color: white;
    color: #868e96;
    position: relative;
    cursor: pointer;
    ${(props) => {
      if (props.index === props.activeIndex) {
        return css`
          color: #617485;
          background-color: #e0f4ff;
        `;
      }
    }}
    :hover, :active {
      color: #617485;
      background-color: #e0f4ff;
    }
  }

  & > button > svg {
    transition: all ease-in-out 0.5s;
    transform: ${(props) => (props.isShow ? 'rotate(180deg)' : 'rotate(0deg)')};
  }

  &:hover > ul {
    /* animation: growDown 600ms ease-in-out; */
    transform-origin: top center;
  }

  @keyframes growDown {
    0% {
      transform: scaleY(0);
    }
    80% {
      transform: scaleY(1.1);
    }
    100% {
      transform: scaleY(1);
    }
  }

  @media screen and (max-width: 500px) {
    width: 12rem;
    & > button {
      font-size: 0.7rem;
      word-break: keep-all;
    }
  }
`;
