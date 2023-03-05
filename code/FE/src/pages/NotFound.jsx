import { useNavigate } from 'react-router-dom';
import styled from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  const moveBefore = () => {
    navigate(-1);
  };

  return (
    <section
      style={{
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        <h1 style={{ textAlign: 'center', color: '#bbb' }}>죄송합니다.</h1>
        <p className={styled.zoom_area}>
          요청하신 페이지는 없는 페이지 입니다.
        </p>
        <section className={styled.error_container}>
          <span className={styled.four}>
            <span className={styled.screen_reader_text}>4</span>
          </span>
          <span className={styled.zero}>
            <span className={styled.screen_reader_text}>0</span>
          </span>
          <span className={styled.four}>
            <span className={styled.screen_reader_text}>4</span>
          </span>
        </section>
        <div className={styled.link_container}>
          <button className={styled.more_link} onClick={moveBefore}>
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
