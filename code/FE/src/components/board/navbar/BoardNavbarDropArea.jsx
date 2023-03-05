import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const area = [
  { key: 'null', label: '전국' },
  { key: 'seoul', label: '서울' },
  { key: 'gwang', label: '광주' },
  { key: 'gumi', label: '구미' },
  { key: 'dae', label: '대전' },
  { key: 'bul', label: '부울경' },
];

const BoardNavbarDropArea = ({ type }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const list = area;

  // 지역별 검색
  const clickHandler = (index) => {
    let query = `key=${type}&popularity=false&user_id=${user.user_id}&word=${list[index].label}`;
    // 전국
    if (index === 0) {
      query = `key=null&popularity=false&user_id=${user.user_id}&word=null`;
    }
    navigate(`../list?${query}`);
  };

  return (
    <UlStyle>
      {list.map((item, index) => (
        <LiStyle key={index} onClick={clickHandler.bind(null, index)}>
          {item.label}
        </LiStyle>
      ))}
    </UlStyle>
  );
};

export default BoardNavbarDropArea;

const UlStyle = styled.ul`
  width: 10rem;
  border: 1px solid #799fc0;
  border-radius: 10px;
  margin-top: 0.2rem;
  z-index: 10;
  background-color: white;

  @media screen and (max-width: 500px) {
    width: 5rem;
    font-size: 0.9rem;
    padding: 0.3rem 0;
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
`;
