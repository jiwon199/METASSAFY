import { BsBookmark, BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { fetchBoardDelete } from '../../../services/board-service';
import styled from 'styled-components';

const ArticleButtonWrapper = ({ article_no }) => {
  const navigate = useNavigate();

  const moveHandler = () => {
    navigate(`../write/${article_no}`);
  };

  const removeHandler = async () => {
    if (window.confirm('게시물을 삭제하시겠습니까?')) {
      const { status } = await fetchBoardDelete(article_no);
      if (status === 200) {
        alert('게시물이 삭제 되었습니다.');
        navigate(-1);
      }
    }
  };

  return (
    <DivStyle>
      <ButtonStyle onClick={moveHandler}>
        <BsBookmark />
        <p>수정하기</p>
      </ButtonStyle>
      <ButtonStyle onClick={removeHandler} color="black" bgc="#F9F6FC">
        <BsTrash />
        <p>삭제하기</p>
      </ButtonStyle>
    </DivStyle>
  );
};

export default ArticleButtonWrapper;

const DivStyle = styled.div`
  @media screen and (max-width: 500px) {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
`;

const ButtonStyle = styled.button`
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color || 'white'};
  background-color: ${(props) => props.bgc || '#799FC1'};
  border: 1px solid #ced4da;
  border-radius: 12px;
  margin-top: 0.8rem;
  font-size: 0.7rem;
  cursor: pointer;

  & svg {
    margin-right: 0.2rem;
  }

  @media screen and (max-width: 500px) {
    width: 30%;
    margin-left: 1rem;
  }
`;
