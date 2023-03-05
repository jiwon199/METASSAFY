import emoji from '../../assets/images/main/emoji.gif';
import music from '../../assets/images/main/music.gif';
import map from '../../assets/images/main/map.gif';
import meeting from '../../assets/images/main/meeting.gif';
import chat from '../../assets/images/main/chat.gif';
import link from '../../assets/images/main/link.gif';

export const firstContent = {
  title: '온라인으로\n만나보세요.',
  subTitle: '타캠퍼스 사람들과 소통해보아요.',

  contents: [
    {
      key: 1,
      title: '다양한 감정 공유하기',
      content: '이모지로 감정을 나타내고 춤을 추며 나를 드러내보아요.',
      img: emoji,
    },
    {
      key: 2,
      title: '원하는 배경 음악을 고르기',
      content: '다양한 배경 음악을 재생해 분위기를 맞춰보아요.',
      img: music,
    },
    {
      key: 3,
      title: '캠퍼스마다 다른 맵 즐기기',
      content: '캠퍼스 특성을 반영한 맵에서 소통해보아요.',
      img: map,
    },
  ],
};

export const secondContent = {
  title: '더 생산성 있게\n협업해보세요.',
  subTitle: '한 공간에서 자유롭게 만나보아요.',

  contents: [
    {
      key: 1,
      title: '협업하기',
      content:
        '화면, 문서, 웹브라우저 등 자료를 공유하며 화상 회의로 협업해요.',
      img: meeting,
    },
    {
      key: 2,
      title: '채팅하기',
      content: '휴대폰 속 공간으로 친구와 개인적인 얘기를 해요.',
      img: chat,
    },
    {
      key: 3,
      title: '기존의 플랫폼으로 이동하기',
      content: 'EduSsafy, Jira, MatterMost 등 기존의 플랫폼으로 이동해요.',
      img: link,
    },
  ],
};
