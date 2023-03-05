import styled from 'styled-components';

import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const search = [
  { key: 'user_id', label: '글쓴이' },
  { key: 'title', label: '제목' },
  { key: 'content', label: '본문' },
];

const BoardNavbarDropSearch = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const list = search;

  // 검색 타입 바꾸기
  const clickHandler = async (index) => {
    setSearchType(index);
  };

  // 키워드 검색
  const searchHandler = (e) => {
    e.preventDefault();

    const query = `key=${search[searchType].key}&popularity=false&user_id=${user.user_id}&word=${searchValue}`;
    navigate(`../list?${query}`);

    // setSearchValue('');
  };

  const keyHandler = (e) => {
    if (e.key === 'Enter') {
      searchHandler(e);
    }
  };

  const inputHandler = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <UlStyle>
      <SearchformStyle>
        <input
          placeholder="검색어 입력하기"
          onKeyDown={keyHandler}
          onChange={inputHandler}
          value={searchValue}
          type="text"
        />
        <button type="submit" onClick={searchHandler}>
          <FiSearch />
        </button>
      </SearchformStyle>
      {list.map((item, index) => (
        <LiStyle
          active={searchType === index}
          key={index}
          onClick={clickHandler.bind(null, index)}
        >
          {item.label}
        </LiStyle>
      ))}
    </UlStyle>
  );
};

export default BoardNavbarDropSearch;

const UlStyle = styled.ul`
  width: 10rem;
  border: 1px solid #799fc0;
  border-radius: 10px;
  margin-top: 0.2rem;
  z-index: 10;
  background-color: white;
  @media screen and (max-width: 500px) {
    width: 8rem;
    font-size: 0.9rem;
  }
`;

const LiStyle = styled.li`
  padding: 0.4rem 0;
  text-align: center;
  border-radius: 10px;
  color: #8a8a8a;
  cursor: pointer;
  &:hover {
    color: black;
    background-color: #e0f4ff;
  }
  background-color: ${(props) => (props.active ? '#e0f4ff' : 'white')};
`;

const SearchformStyle = styled.form`
  display: flex;
  width: 100%;

  & > input {
    width: 7rem;
    height: 1.3rem;
    margin: 0.4rem;
    border: none;
    border-style: none;
    border-bottom: 1px solid #8a8a8a;
    &:active,
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #7d78787b;
    }
    @media screen and (max-width: 500px) {
      width: 5rem;
    }
  }

  & > button {
    border: none;
    padding: 0;
    margin: 0;
    background-color: transparent;
  }

  & > button > svg {
    font-size: 1.2rem;
    margin: 0.4rem;
    margin-right: 0.5rem;
    cursor: pointer;
  }
`;
