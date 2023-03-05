import { useState } from 'react';
import styled from 'styled-components';

import { FiImage, FiDelete } from 'react-icons/fi';
import { useEffect } from 'react';
import { fetchBoardImageDelete } from '../../../services/board-service';

const BoardWriteImage = ({
  setFiles,
  originFiles,
  setOriginFiles,
  article_no,
}) => {
  const [preImages, setPreImages] = useState([]); // img src, name
  const [originPreImages, setOriginPreImages] = useState([]); // img src, name

  // 수정 모드에서 미리보기 이미지 초기화
  useEffect(() => {
    setOriginPreImages(originFiles);
  }, [originFiles]);

  // 제출한 이미지 미리보기
  const encodeFileToBase64 = (fileBlobs) => {
    for (const fileBlob of fileBlobs) {
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      const promise = new Promise((resolve) => {
        reader.onload = () => {
          resolve(reader.result);
        };
      });
      promise.then((value) => {
        setPreImages((preState) => {
          return [
            ...preState,
            { src: value, name: fileBlob.name, key: preState.length },
          ];
        });
      });
    }
  };

  // 수정 모드에서 원래 파일 삭제 API
  const originImgDeleteHandler = async (index, e) => {
    e.preventDefault();

    const currentFile = originPreImages[index];

    // 서버에 삭제 요청
    const body = {
      article_no,
      saved_name: currentFile.saved_name,
    };
    await fetchBoardImageDelete(body);

    // 파일, 미리보기 state 관리
    setOriginFiles((preState) => {
      const newList = [...preState];
      newList.splice(index, 1);
      return newList;
    });
    setOriginPreImages((preState) => {
      const newList = [...preState];
      newList.splice(index, 1);
      return newList;
    });
  };

  // 이미지 삭제
  const imgDeleteHandler = (index, e) => {
    e.preventDefault();

    setPreImages((preState) => {
      const newList = [...preState];
      newList.splice(index, 1);
      return newList;
    });
    setFiles((preState) => {
      const newList = [...preState];
      newList.splice(index, 1);
      return newList;
    });
  };

  const handleUploadImg = (e) => {
    const files = e.target.files;
    setFiles((preState) => {
      return [...preState, ...files];
    });
    encodeFileToBase64(files);
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <label htmlFor="chooseFile">
          <ImgSelectDivStyle>
            이미지를 선택해주세요.
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FiImage color="#799FC1" />
              <div style={{ marginLeft: '0.3rem' }}>파일 선택</div>
            </div>
          </ImgSelectDivStyle>
        </label>
        <div>
          {originPreImages.map((image, index) => {
            return (
              <PreImgDivStyle key={index}>
                <img src={image.path} alt="preview-img" />
                <div>{image.origin_name}</div>
                <button
                  type="button"
                  onClick={originImgDeleteHandler.bind(null, index)}
                >
                  <FiDelete />
                </button>
              </PreImgDivStyle>
            );
          })}
          {preImages.map((image, index) => {
            return (
              <PreImgDivStyle key={index}>
                <img src={image.src} alt="preview-img" />
                <div>{image.name}</div>
                <button
                  type="button"
                  onClick={imgDeleteHandler.bind(null, index)}
                >
                  <FiDelete />
                </button>
              </PreImgDivStyle>
            );
          })}
        </div>
      </div>
      <input
        type="file"
        id="chooseFile"
        name="chooseFile"
        multiple="multiple"
        accept="image/*"
        onChange={(e) => {
          handleUploadImg(e);
        }}
        style={{ display: 'none' }}
      />
    </>
  );
};

export default BoardWriteImage;

const ImgSelectDivStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 2rem;
  padding: 0 1rem;
  color: #5f6e7e;
  background-color: #f5fcff;
  font-size: 0.75rem;
  border: 1px solid #eef9ff;
  border-radius: 20px;
  cursor: pointer;
`;

const PreImgDivStyle = styled.div`
  /* max-width: 2rem; */
  display: flex;
  align-items: center;
  height: 3rem;
  color: #5f6e7e;
  font-size: 0.7rem;
  margin: 0.2rem;

  & img {
    width: 4rem;
    max-height: 2rem;
    margin: 0 0.5rem;
  }

  & button {
    margin-left: 0.5rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;
