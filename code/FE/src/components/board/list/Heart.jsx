import { Fragment } from 'react';
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  fetchBoardLikeDelete,
  fetchBoardLikePost,
  getBoardList,
} from '../../../services/board-service';

const Heart = ({ type, no, isLike, setBoardList, setLikeNum, setIsLike }) => {
  const navigate = useNavigate;
  const user = useSelector((state) => state.auth.user);
  const [searchParams] = useSearchParams();
  const key = searchParams.get('key');
  const popularity = searchParams.get('popularity');
  const word = searchParams.get('word');

  const move = () => {
    const query = `key=${key}&popularity=${popularity}&user_id=${user.user_id}&word=${word}`;
    navigate(`../list?${query}`);
  };

  const heartHandler = async (e) => {
    e.preventDefault();
    const user_id = user.user_id;
    const data = { type, no, user_id };
    if (isLike === 0) {
      await fetchBoardLikePost(data); // 좋아요 요청
      setLikeNum && setLikeNum((preState) => preState + 1);
      setIsLike && setIsLike(true);
    } else {
      await fetchBoardLikeDelete(data); // 싫어요 요청
      setLikeNum && setLikeNum((preState) => preState - 1);
      setIsLike && setIsLike(false);
    }

    if (setBoardList) {
      const newList = await getBoardList(key, popularity, user.user_id, word);
      setBoardList(newList);
    }
  };

  return (
    <Fragment>
      <ButtonStyle like={isLike} onClick={heartHandler}>
        {!!isLike && <BsSuitHeartFill />}
        {!isLike && <BsSuitHeart />}
      </ButtonStyle>
    </Fragment>
  );
};

export default Heart;

const ButtonStyle = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  cursor: pointer;

  & svg {
    color: #ff7f77;
    font-size: 1.3rem;
  }

  &:hover svg {
    color: #f0b0bc;
  }
`;
