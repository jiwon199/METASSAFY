import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

const BoardNavbarItem = ({ menu, index, activeIndex, setActiveIndex }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // 넷바 클릭 시 리스트 업데이트
  const clickHandler = async () => {
    // button active css
    if (index === activeIndex) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }

    // 넷바 클릭시 (전체, 인기순, 게시글) 검색
    let key = null;
    let popularity = false;
    let user_id = user.user_id;
    let word = null;
    let query = '';
    if (menu.type === 'recent') {
    } else if (menu.type === 'like') {
      popularity = true;
    } else if (menu.type === 'my') {
      key = 'user_id';
      word = user_id;
      query = user_id;
    }

    query = `key=${key}&popularity=${popularity}&user_id=${user_id}&word=${word}`;
    navigate(`../list?${query}`);
  };

  return (
    <LiStyle index={index} activeIndex={activeIndex}>
      <button onClick={clickHandler}>{menu.label}</button>
    </LiStyle>
  );
};

export default BoardNavbarItem;

const LiStyle = styled.li`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
  height: 2rem;

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 1rem;
    width: 100%;
    height: 100%;
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

  @media screen and (max-width: 500px) {
    width: 12rem;
    & > button {
      font-size: 0.7rem;
      word-break: keep-all;
    }
  }
`;
