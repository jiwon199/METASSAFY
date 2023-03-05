import DevelopersCard from './DevelopersCard';
import styled from 'styled-components';

import guitar from '../../assets/images/guitar.gif';

function DevelopersList() {
  return (
    <DevelopDiv>
      <FlexDiv>
        <BlankDiv />
        <InvitedImgStyle
          src="https://em-content.zobj.net/source/noto-emoji-animations/344/four-leaf-clover_1f340.gif"
          alt=""
        />
        <DevelopersCard
          work="팀장"
          name="오주영"
          career="ssafy8juoh@gmail.com"
          describe="열정 가득 개발 꿈나무🍀
좋은 팀원들과 함께할 수 있어 영광입니다.
하면 된다! 할 수 있다! 절대 절대 포기 금지!
꿈을 이루는 그날까지!
열심히 노력하겠습니다."
        />
      </FlexDiv>
      <FlexDiv>
        <DevelopersCard
          work="팀원"
          name="윤소현"
          career="wja06018@naver.com"
          describe="절대 절대 포기하기 말기!
노력하면 뭐든 할 수 있다!!
좋은 팀원분들 항상 감사합니다."
        />
        <InvitedImgStyle src={guitar} alt="" />
        <BlankDiv />
      </FlexDiv>
      <FlexDiv>
        <BlankDiv />
        <InvitedImgStyle
          src="https://em-content.zobj.net/source/noto-emoji-animations/344/gem-stone_1f48e.gif"
          alt=""
        />
        <DevelopersCard
          work="팀원"
          name="이시준"
          career="season2lee@gmail.com"
          describe="FE/BE 둘 모두를 해내는 꿈을 꾸는 중.
하면 된다! 그 각오가 무너질까 잠깐은 걱정도 했지만
좋은 팀원들과 함께할 수 있었던 덕분에
기쁘게도 제가 얻은 것은 확신이었습니다.
메타싸피에서 좋은 시간 보내고 가세요!"
        />
      </FlexDiv>
      <FlexDiv>
        <DevelopersCard
          work="팀원"
          name="이햇살"
          career="lasteah22@gmail.com"
          describe="메타버스속의 싸피를 기획하고 구현하며 즐거웠습니다! 
좋은 팀원분들과 함께해서 보람찬 6주를 보낸 것 같습니다.
하면된다! 절절포!"
        />
        <InvitedImgStyle
          src="https://em-content.zobj.net/source/microsoft-teams/337/sun-with-face_1f31e.png"
          alt=""
        />
        <BlankDiv />
      </FlexDiv>
      <FlexDiv>
        <BlankDiv />
        <InvitedImgStyle
          src="https://em-content.zobj.net/source/microsoft-teams/337/chair_1fa91.png"
          alt=""
        />
        <DevelopersCard
          work="팀원"
          name="최지원"
          career="gwonwon1201@gmail.com"
          describe="안녕하세요.
커피와 게임을 좋아하는 개발자 최지원 입니다.
저 열심히 했어요..."
        />
      </FlexDiv>
      <FlexDiv>
        <DevelopersCard
          work="팀원"
          name="이석원"
          career="tjrdnjs67@naver.com"
          describe="나태하지말기!
인생에서 가장 빠른 6주 였습니다.
좋은 팀원들 덕분에 흐릿했던 시작이 창대하게 끝낼 수 있었습니다. 
감사합니다.
🌚올림"
        />
        <InvitedImgStyle
          src="https://em-content.zobj.net/source/microsoft-teams/337/new-moon-face_1f31a.png"
          alt=""
        />
        <BlankDiv />
      </FlexDiv>
    </DevelopDiv>
  );
}

export default DevelopersList;

const InvitedImgStyle = styled.img`
  width: 12rem;
  height: 12rem;
  object-fit: cover;
  border-radius: 50%;
  margin: 0rem 2rem;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0rem;
`;

const BlankDiv = styled.div`
  width: 17rem;
  height: 17rem;
`;

const DevelopDiv = styled.div`
  margin: 3rem 0rem;
`;
