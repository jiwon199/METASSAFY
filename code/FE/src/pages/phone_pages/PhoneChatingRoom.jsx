import FriendChatBox from '../../components/phone/chat/FriendChatBox';
import PhoneOutLine from '../../components/UI/PhoneOutLine';

import styled from 'styled-components';
import ChatRoomNav from '../../components/phone/chat/ChatRoomNav';
import MyChatBox from '../../components/phone/chat/MyChatBox';
import ChatRoomForm from '../../components/phone/chat/ChatRoomForm';

import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { useState, useEffect, useRef } from 'react';

import API from '../../utils/api';
import { getJsonLocalUserInfo } from '../../utils/local-storage';

import { useParams } from 'react-router-dom';

let stompClient;
let startNo = 0;

function PhoneChatingRoom(props) {
  // // 파람스 시도
  const params = useParams();
  const room = params.id;
  const user = getJsonLocalUserInfo()['user_id'] || 'annonymous';
  const name = getJsonLocalUserInfo()['name'] || 'annonymous';

  const [chatList, setChatList] = useState([]);
  const [chatRoom, setRoomList] = useState({});
  const [chat, setChat] = useState('');

  const chatBoxRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [target, setTarget] = useState(null);
  const [scrollLen, setscrollLen] = useState(0);

  const [sending, setSending] = useState(0);

  const [forTime, setForTime] = useState(0);

  let temp = [];

  const connect = () => {
    const socket = new SockJS('https://www.metassafy.store/api/ws');
    // const socket = new SockJS('http://i8d211.p.ssafy.io:8088/metassafy/ws');
    // const socket = new SockJS('http://192.168.100.124:9999/metassafy/ws');
    stompClient = Stomp.over(socket);

    // connect(header,연결 성공시 콜백,에러발생시 콜백)
    stompClient.connect(
      {},
      function () {
        //subscribe(subscribe url,해당 url로 메시지를 받을때마다 실행할 함수)
        stompClient.subscribe('/sub/chat/room/' + room, async function (e) {
          //e.body에 전송된 data가 들어있다
          const content = JSON.parse(e.body);

          content.user_id = user;

          // last_read_chat_id 최신화

          // not_read 최신화
          await API.put(`/chat`, JSON.stringify(content))
            .then((res) => {})
            .catch((err) => console.log());

          // await fetch(`http://i8d211.p.ssafy.io:8088/metassafy/chat`, {
          //   method: 'put',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify(content),
          // });

          await API.put(
            `/participant/last_read_chat_id`,
            JSON.stringify(content)
          )
            .then((res) => {
              // console.log('최신화 중');
            })
            .catch((err) => console.log());
          // await fetch(
          //   `http://i8d211.p.ssafy.io:8088/metassafy/participant/last_read_chat_id`,
          //   {
          //     method: 'put',
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify(content),
          //   }
          // );

          // chat 리스트 다시 불러오기
          // 대화목록 가져오기
          await API.get(`/chat`, {
            params: {
              start_no: startNo,
              user_id: user,
              croom_no: room,
            },
          })
            .then((res) => {
              temp = res.data;
              // console.log(
              //   res.data,
              //   '-=-=-=-=-=-=socket await api-=-=-=-=-=-=-='
              // );
            })
            .catch((err) => console.log());

          // await fetch(
          //   `http://i8d211.p.ssafy.io:8088/metassafy/chat?start_no=0&user_id=ssafy&croom_no=${room}`
          // )
          //   .then((res) => res.json())
          //   .then((data) => (temp = data));
          // console.log(temp, '========socket connect입니다=========');
          setChatList(temp);
          // setChatList((_chat_list) => [..._chat_list, content]);
        });

        // const data = {
        //   croom_no: room,
        //   user_id: user,
        //   name: 'seok',
        //   message: chat,
        // };
        // // send(destination,헤더,페이로드)
        // stompClient.send('/pub/chat/room/message', {}, JSON.stringify(data));
      },
      function (e) {
        alert('에러발생!!!!!!');
      }
    );
  };

  const send = () => {
    const data = {
      croom_no: room,
      user_id: user,
      name: name,
      message: chat,
    };
    // send(destination,헤더,페이로드)
    stompClient.send('/pub/chat/room/message', {}, JSON.stringify(data));
    setSending(sending + 1);
  };

  const getChat = async () => {
    const data = {
      croom_no: room,
      user_id: user,
    };

    // not_read 최신화
    await API.put('/chat', JSON.stringify(data)).then((res) => {});

    // last_read_chat_id 최신화
    await API.put(`/participant/last_read_chat_id`, JSON.stringify(data))
      .then((res) => {})
      .catch((err) => console.log());

    // await fetch(`http://i8d211.p.ssafy.io:8088/metassafy/chat`, {
    //   method: 'put',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(content),
    // });

    // chat 리스트 다시 불러오기
    // 대화목록 가져오기
    await API.get(`/chat`, {
      params: {
        start_no: startNo,
        user_id: user,
        croom_no: room,
      },
    })
      .then((res) => {
        temp = res.data;
        startNo = res.data[0]['chat_no'];
      })
      .catch((err) => console.log());

    // await fetch(
    //   `http://i8d211.p.ssafy.io:8088/metassafy/chat?start_no=0&user_id=ssafy&croom_no=${room}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => (temp = data));
    // console.log(temp, '========socket connect입니다=========');
    setChatList(temp);
    // setChatList((_chat_list) => [..._chat_list, content]);
  };

  useEffect(() => {
    getChat();
    // API.put(
    //   `/participant/last_read_chat_id`,
    //   JSON.stringify({ user_id: user, croom_no: room })
    // )
    //   .then((res) => {
    //     console.log('최신화 중');
    //   })
    //   .catch((err) => console.log(err));
    connect();

    return () => {
      startNo = 0;
      API.put(
        `/participant/leave_room`,
        JSON.stringify({ user_id: user, croom_no: room })
      ).then((res) => {});
      // console.log('disconnect ------------------------------------------');
      stompClient.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   const data = {
  //     croom_no: room,
  //     user_id: user,
  //   };
  //   // not_read 갱신하기
  //   API.put('/chat', JSON.stringify(data))
  //     .then((res) => console.log(res))
  //     .then(() => {
  //       API.get('/chat', {
  //         params: {
  //           start_no: startNo,
  //           user_id: user,
  //           croom_no: room,
  //         },
  //       })
  //         .then((res) => {
  //           setChatList(res.data);
  //           startNo = res.data[0]['chat_no'];
  //           // console.log(res.data[0]['chat_no'], '--startno--');
  //           // console.log(startNo, '--startno--');
  //           // console.log(res.data, '------useEffect입니다--------');
  //         })
  //         .catch((err) => console.log(err));
  //     });
  // }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setForTime(forTime + 1), 2000);
    API.get(`/chat/room`, {
      params: {
        croom_no: room,
      },
    })
      .then((res) => {
        setRoomList(res.data);
      })
      .catch((err) => console.log());

    API.get(`/chat`, {
      params: {
        start_no: startNo,
        user_id: user,
        croom_no: room,
      },
    })
      .then((res) => {
        setChatList(res.data);
        startNo = res.data[0]['chat_no'];
        // console.log(
        //   res.data,
        //   '-=-=-=-=-=-=socket await api-=-=-=-=-=-=-='
        // );
      })
      .catch((err) => console.log());

    return () => clearTimeout(timeout);
  }, [forTime]);

  useEffect(() => {
    // console.log(chatBoxRef.current.scrollTop, '스크롤 시작');
    // console.log(chatBoxRef.current.scrollHeight, '스크롤 길이');
    setscrollLen(chatBoxRef.current.scrollHeight);
    // console.log(scrollLen, 'scrolllen');
    chatBoxRef.current.scrollTop = chatBoxRef.current?.scrollHeight - scrollLen;
  }, [startNo]);

  useEffect(() => {
    setTimeout(
      () => (chatBoxRef.current.scrollTop = chatBoxRef.current?.scrollHeight),
      200
    );
  }, [sending]);

  const getMoreItem = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    API.get(`/chat/upscroll`, {
      params: {
        start_no: startNo,
        croom_no: room,
      },
    }).then((res) => {
      if (res.data === '') {
      } else {
        const newList = res.data;
        setChatList((chatList) => newList.concat(chatList));
        startNo = res.data[0].chat_no;
        setIsLoading(false);
      }
    });
    // let newList = [];
    // setChatList((chatList) => chatList.concat(newList));
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoading) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <PhoneOutLine>
      <ChatRoomNav chatRoom={chatRoom} />
      <ChatRoomDiv ref={chatBoxRef}>
        <PhoneChatingRoomStyle>
          {!isLoading && scrollLen > 480 && <div ref={setTarget}></div>}
          {chatList.map((chat) => {
            if (chat.user_id === user) {
              return <MyChatBox chat={chat} key={chat.chat_no} />;
            } else {
              return <FriendChatBox chat={chat} key={chat.chat_no} />;
            }
          })}
        </PhoneChatingRoomStyle>
      </ChatRoomDiv>
      <ChatRoomForm setChat={setChat} send={send} />
    </PhoneOutLine>
  );
}

export default PhoneChatingRoom;

const PhoneChatingRoomStyle = styled.div`
  padding: 0.5rem;
  display: grid;
  width: 100%;
`;

const ChatRoomDiv = styled.div`
  width: 100%;
  height: 72%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #617485;
  }
`;
