import { useState } from 'react';
import BoardCard from './BoardCard';
import styled from 'styled-components';
import Masonry from '@mui/lab/Masonry';
import { useEffect } from 'react';

const BoardFeed = ({ boardList, setBoardList }) => {
  const [columns, setColumns] = useState(4);

  const resize = () => {
    if (window.innerWidth > 1200) {
      setColumns(4);
    } else if (window.innerWidth > 950) {
      setColumns(3);
    } else if (window.innerWidth > 700) {
      setColumns(2);
    } else {
      setColumns(1);
    }
  };

  useEffect(() => {
    resize();
  }, []);

  window.addEventListener(`resize`, resize);

  return (
    <SectionStyle>
      {boardList.length !== 0 ? (
        <Masonry columns={columns} spacing={2}>
          {boardList.map((card, index) => (
            <BoardCard key={index} card={card} setBoardList={setBoardList} />
          ))}
        </Masonry>
      ) : (
        <DivStyle>검색 결과가 없습니다.</DivStyle>
      )}
    </SectionStyle>
  );
};

export default BoardFeed;

const SectionStyle = styled.section`
  display: flex;
  width: 100%;
  padding: 2rem;
  flex-wrap: wrap;
  min-height: 30rem;
  @media screen and (max-width: 500px) {
    padding: 1rem;
    flex-direction: column;
    align-items: center;
  }
`;

const DivStyle = styled.div`
  width: 100%;
  height: 5rem;
  text-align: center;
`;
