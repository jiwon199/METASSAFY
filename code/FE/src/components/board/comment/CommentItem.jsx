import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  fetchCocommentGet,
  fetchCommentDelete,
  fetchCommentGet,
} from '../../../services/board-service';
import Avatar from '../article/Avatar';
import Heart from '../list/Heart';
import CommentInput from './CommentInput';
import { BsArrowReturnRight } from 'react-icons/bs';
import CocomentItem from './CocomentItem';
import { useNavigate } from 'react-router-dom';

const CommentItem = ({ comment, setComments, user_id }) => {
  const [likeNum, setLikeNum] = useState(comment.memo_like);
  const [isLike, setIsLike] = useState(comment.my_like);
  const [isWriting, setIsWriting] = useState(false);
  const [cocomments, setCocomments] = useState([]);
  const navigation = useNavigate();

  // 댓글 좋아요 갱신
  useEffect(() => {
    setLikeNum(comment.memo_like);
    setIsLike(comment.my_like);
  }, [comment]);

  // 대댓글 가져오기
  useEffect(() => {
    const getCocomment = async () => {
      const { data, status } = await fetchCocommentGet(
        comment.memo_no,
        user_id
      );
      // 대댓 없으면
      if (status === 500) {
        setCocomments([]);
      } else {
        // 있으면
        setCocomments(data);
      }
    };
    if (user_id) {
      getCocomment();
    }
  }, [comment, user_id]);

  // 댓글 삭제
  const deleteHandler = async () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      await fetchCommentDelete(comment.memo_no);
      const { data } = await fetchCommentGet(comment.article_no, user_id);
      setComments(data);
    }
  };

  // 메메모 작성
  const showMememoHandler = () => {
    setIsWriting((preState) => !preState);
  };

  return (
    <LiSection>
      {/* 댓글 */}
      <CommentWrapper>
        <Avatar img={comment.profile_img} user={comment.user_id} />
        <CommentDiv>
          <DivStyle>
            <TitleStyle>
              {comment.name}
              <span>{comment.regtime.slice(2)}</span>
            </TitleStyle>
            <ButtonWrapper>
              {comment.user_id === user_id && (
                <ButtonStyle onClick={deleteHandler}>삭제하기</ButtonStyle>
              )}
              <ButtonStyle onClick={showMememoHandler}>대댓글</ButtonStyle>
              <LikeDivStyle>
                <Heart
                  type="2"
                  no={comment.memo_no}
                  isLike={isLike}
                  setLikeNum={setLikeNum}
                  setIsLike={setIsLike}
                />
                <p style={{ marginLeft: '0.3rem' }}>{likeNum}</p>
              </LikeDivStyle>
            </ButtonWrapper>
          </DivStyle>
          <ContentStyle>{comment.content}</ContentStyle>
        </CommentDiv>
      </CommentWrapper>
      {/* 대댓글 */}
      <CocomentWrapper>
        <CocommentUlStyle>
          {cocomments &&
            cocomments.map((cocomment, index) => {
              return (
                <CocomentItem
                  key={index}
                  cocomment={cocomment}
                  setCocomments={setCocomments}
                  user_id={user_id}
                />
              );
            })}
        </CocommentUlStyle>
        {isWriting && (
          <CocomentWriteWrapper>
            <BsArrowReturnRight />
            <CommentInput
              isCocomment={true}
              article_no={comment.memo_no}
              setComments={setCocomments}
            />
          </CocomentWriteWrapper>
        )}
      </CocomentWrapper>
    </LiSection>
  );
};

export default CommentItem;

const LiSection = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 1rem 0;
`;

const CommentWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const CommentDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DivStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 0.3rem;
`;

const TitleStyle = styled.div`
  & span {
    padding-left: 0.5rem;
    font-size: 0.7rem;
    color: #868e96;
  }

  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    & span {
      padding: 0;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding-left: 1.5rem;
  padding-right: 1rem;
  color: #868e96;
  @media screen and (max-width: 500px) {
    padding: 0;
  }
`;

const ButtonStyle = styled.button`
  width: 5rem;
  font-size: 0.8rem;
  border: none;
  background-color: transparent;
  color: #799fc1;
  padding-right: 0.6rem;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    width: 3.5rem;
    padding: 0;
  }
`;

const LikeDivStyle = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  & svg {
    font-size: 0.8rem;
  }
`;

const ContentStyle = styled.div`
  word-break: break-all;
  padding: 0.6rem 0;
  color: #3d4248;
  font-size: 0.8rem;
`;

const CocomentWrapper = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
`;

const CocomentWriteWrapper = styled.div`
  height: 5rem;
  display: flex;

  & svg {
    margin-right: 1rem;
  }
`;

const CocommentUlStyle = styled.ul`
  width: 100%;
  margin-top: 1.2rem;
`;
