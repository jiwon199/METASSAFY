import { useState } from 'react';
import styled from 'styled-components';
import BoardNavbarItem from './BoardNavbarItem';
import BoardNavbarItemDrop from './BoardNavbarItemDrop';

const menuList = [
  { label: '전체', type: 'recent', drop: false },
  { label: '지역별', type: 'area', drop: true },
  { label: '인기순', type: 'like', drop: false },
  { label: '내 게시글', type: 'my', drop: false },
  { label: '게시글 검색', type: 'search', drop: true },
];

const BoardNavbar = ({ setBoardList }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <UlStyle>
      {menuList.map((menu, index) => {
        return menu.drop ? (
          <BoardNavbarItemDrop
            key={index}
            menu={menu}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            setBoardList={setBoardList}
          ></BoardNavbarItemDrop>
        ) : (
          <BoardNavbarItem
            key={index}
            menu={menu}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            setBoardList={setBoardList}
          ></BoardNavbarItem>
        );
      })}
    </UlStyle>
  );
};

export default BoardNavbar;

const UlStyle = styled.ul`
  width: 12rem;
  @media screen and (max-width: 500px) {
    display: flex;
    width: 100%;
  }
`;
