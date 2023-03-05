import React, { useEffect } from 'react';
import { useState } from 'react';

import styled from 'styled-components';
import { FiCamera } from 'react-icons/fi';
import {
  fetchGetImageUrl,
  fetchProfileImage,
} from '../../../services/profile-service';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function BackgroundModifyBox({ user_id, image, isSubmit }) {
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState(image);
  const [file, setFile] = useState();
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    if (isSubmit) {
      submitFile();
    }
  }, [isSubmit]);

  //사용자가 올린 이미지를 db에 넣고 스토리지에 올라간 링크로 받아옴
  const submitFile = async () => {
    if (isChange) {
      const formData = new FormData();
      formData.append('profile_img', file);
      const { data: url } = await fetchGetImageUrl(formData);
      fetchProfileImage(url, user_id);
    }
  };

  const encodeFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setThumbnail(reader.result);
    };
  };

  const handlePreImg = (e) => {
    const file = e.target.files[0];
    setIsChange(true);
    setFile(file);
    encodeFileToBase64(file);
  };

  return (
    <WrapperStyle>
      <BackgroundBoxStyle>
        <PasswordButtonStyle onClick={() => navigate('/password')}>
          <p>비밀번호 변경</p>
          <FiArrowRight />
        </PasswordButtonStyle>
        <form method="post" encType="multipart/form-data">
          <div className="button">
            <label htmlFor="chooseFile">
              <CircleBackgroundStyle>
                <CircleCameraStyle>
                  <FiCamera />
                </CircleCameraStyle>
                <CircleImgStyle src={thumbnail} id="imgChange"></CircleImgStyle>
              </CircleBackgroundStyle>
            </label>
          </div>
          <input
            type="file"
            id="chooseFile"
            name="chooseFile"
            accept="image/*"
            onChange={handlePreImg}
            style={{ display: 'none' }}
          />
        </form>
      </BackgroundBoxStyle>
    </WrapperStyle>
  );
}

export default BackgroundModifyBox;

const WrapperStyle = styled.div`
  display: block;
`;

const BackgroundBoxStyle = styled.div`
  background-color: #e0f4ff;
  border-radius: 20px;
  box-shadow: inset 0 0.2rem 0.2rem rgba(0, 0, 0, 0.0500000007);
  width: 20rem;
  height: 8rem;
  position: relative;
  margin-bottom: 2.8rem;
`;

const CircleBackgroundStyle = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(to left, #c1a1d3, #c3ddff);
  /* background-color: #8b9cd9; */
  border-radius: 100%;
  position: absolute;
  top: 40%;
  left: 5%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const CircleCameraStyle = styled.div`
  z-index: 30;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.2rem;
`;

const CircleImgStyle = styled.img`
  width: 90%;
  height: 90%;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: brightness(50%);
  opacity: 0.5;
`;

const PasswordButtonStyle = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid #b1acac;
  display: flex;
  justify-content: space-between;
  align-items: center;
  float: right;
  margin: 0.5rem 0.5rem 0 0;
  cursor: pointer;

  & svg {
    margin-left: 0.3rem;
    font-size: 1rem;
  }
`;
