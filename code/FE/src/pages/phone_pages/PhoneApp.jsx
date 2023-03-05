import styled from 'styled-components';
import ssafy from '../../assets/images/ssafy_logo.png';
import baekjoon from '../../assets/images/beakjoon.png';
import github from '../../assets/images/github.png';
import gitlab from '../../assets/images/gitlab2.png';
import jira from '../../assets/images/jira.png';
import leetcode from '../../assets/images/leetcode.png';
import programmers from '../../assets/images/programmers.png';
import swea from '../../assets/images/swea.png';
import webex from '../../assets/images/webex.png';
import mattermost from '../../assets/images/mattermost.png';

function PhoneApp() {
  return (
    <MainDiv>
      <a href="http://edu.ssafy.com" target="_blank">
        <SsafyImg src={ssafy} alt="ssafy" />
      </a>
      <CenterDiv>
        <a href="https://swexpertacademy.com/" target="_blank">
          <ImgStyle src={swea} alt="swea" />
        </a>
        <a href="https://ssafy.atlassian.net/jira/your-work" target="_blank">
          <ImgStyle src={jira} alt="ssafyjira" />
        </a>
        <a href="https://meeting.ssafy.com/" target="_blank">
          <ImgStyle src={mattermost} alt="mattermost" />
        </a>
        <a href="https://ssafyclass.webex.com/" target="_blank">
          <ImgStyle src={webex} alt="ssafywebex" />
        </a>
        <a href="https://lab.ssafy.com/" target="_blank">
          <ImgStyle src={gitlab} alt="labssafy" />
        </a>
        <a href="https://github.com/" target="_blank">
          <ImgStyle src={github} alt="github" />
        </a>
        <a href="https://www.acmicpc.net/" target="_blank">
          <ImgStyle src={baekjoon} alt="baekjoon" />
        </a>
        <a href="https://programmers.co.kr/" target="_blank">
          <ImgStyle src={programmers} alt="programmers" />
        </a>

        <a href="https://leetcode.com/" target="_blank">
          <ImgStyle src={leetcode} alt="leetcode" />
        </a>
      </CenterDiv>
    </MainDiv>
  );
}

export default PhoneApp;

const MainDiv = styled.div`
  margin: 2rem;
  text-align: center;
`;

const CenterDiv = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(3, 6rem);
`;

const ImgStyle = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 10%;
  margin: 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  :hover {
    width: 5.5rem;
    height: 5.5rem;
  }
`;

const SsafyImg = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 10%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  :hover {
    width: 11rem;
    height: 11rem;
  }
`;
