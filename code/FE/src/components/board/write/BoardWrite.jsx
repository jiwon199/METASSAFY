import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { BsPencilSquare } from 'react-icons/bs';
import BoardWriteInput from './BoardWriteInput';
import BoardWriteImage from './BoardWriteImage';
import {
  fetchBoardPost,
  fetchBoardGet,
  fetchBoardPut,
} from '../../../services/board-service';

const BoardWrite = () => {
  const { id: article_no } = useParams();
  const navigator = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [article, setArticle] = useState({
    title: '',
    content: '',
  });
  const [files, setFiles] = useState([]);
  const [originFiles, setOriginFiles] = useState([]);

  // 수정 모드면 기존 데이터 삽입
  useEffect(() => {
    const getArticle = async () => {
      const { data } = await fetchBoardGet(article_no, user.user_id);
      setArticle({
        title: data.title,
        content: data.content,
        thumbnail: data.thumbnail,
      });
      setOriginFiles(data.files);
    };
    if (article_no && user.user_id) {
      getArticle();
    }
  }, [article_no, user.user_id]);

  // 작성 결과 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!article.title || !article.content) {
      alert('제목과 내용은 필수 입력입니다.');
      return;
    }

    const boardDto = {
      user_id: user.user_id,
      title: article.title,
      content: article.content,
    };

    if (!!article_no) {
      // 수정 시 추가 정보
      boardDto.article_no = article_no;
      boardDto.thumbnail = originFiles[0] ? originFiles[0].path : null;
    }

    const formData = new FormData();
    formData.append(
      'boardDto',
      new Blob([JSON.stringify(boardDto)], {
        type: 'application/json',
      })
    );

    // 파일 추가
    files.forEach((file) => {
      formData.append('files', file);
    });
    if (files.length === 0) {
      formData.append('files', null);
    }

    // 글 업로드 요청
    const uploadBoard = async () => {
      // put
      if (!!article_no) {
        const { status } = await fetchBoardPut(formData);
        if (status) {
          navigator(-1);
        }
      } // post
      else {
        const { status } = await fetchBoardPost(formData);
        if (status) {
          navigator('../list');
        }
      }
    };
    uploadBoard();
  };

  return (
    <WriteSection>
      <form method="post" encType="multipart/form-data">
        <BoardWriteInput
          type="title"
          label="제목"
          placeholder="제목"
          value={article.title}
          setValue={setArticle}
        />
        <BoardWriteInput
          type="content"
          label="본문"
          placeholder="새 글 작성"
          value={article.content}
          setValue={setArticle}
        />
        <BoardWriteImage
          setFiles={setFiles}
          originFiles={originFiles}
          setOriginFiles={setOriginFiles}
          article_no={article_no}
        />
        <HrStyle />
        <BoardWriteButtonStyle onClick={handleSubmit}>
          <BsPencilSquare style={{ fontSize: '0.9rem' }} />
          <p>저장</p>
        </BoardWriteButtonStyle>
      </form>
    </WriteSection>
  );
};
export default BoardWrite;

const WriteSection = styled.section`
  width: 70%;
  margin-top: 8rem;
  @media screen and (max-width: 500px) {
    margin-top: 2rem;
  }
`;

const HrStyle = styled.hr`
  background-color: #ced4da;
  border: none;
  height: 0.1px;
  margin: 1rem 0;
`;

const BoardWriteButtonStyle = styled.button`
  display: flex;
  justify-content: space-around;
  align-items: center;
  float: right;
  width: 7rem;
  padding: 0.5rem 2rem;
  border-radius: 8px;
  border: none;
  background-color: #799fc1;
  color: white;
  font-size: 0.7rem;
  cursor: pointer;
`;
