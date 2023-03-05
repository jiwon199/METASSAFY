import React from 'react';

import BoardMainSection from '../components/board/BoardMainSection';
import BoardTopSection from '../components/board/BoardTopSection';

const BoardPage = () => {
  return (
    <section>
      <BoardTopSection></BoardTopSection>
      <BoardMainSection></BoardMainSection>
    </section>
  );
};

export default BoardPage;
