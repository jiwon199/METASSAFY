import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

function ChatRoomStartBox(props) {
  const [isCheck, setCheck] = useState(false);
  const result = [
    props.result.name,
    props.result.user_id,
    props.result.profile_img,
  ];

  function handleClick() {
    if (isCheck) {
      setCheck((e) => !e);
      const list = [...props.tempList];
      const newList = list.filter((temp) => {
        return temp[1] !== result[1];
      });
      // list.splice(list.indexOf(result), 1);
      props.setTempList([...newList]);
    } else {
      setCheck((e) => !e);
      props.setTempList([...props.tempList, result]);
    }
  }

  useEffect(() => {
    const newList = props.tempList.filter((temp) => {
      return (
        temp[0] === result[0] && temp[1] === result[1] && temp[2] === result[2]
      );
    });
    setCheck(newList.length || false);
  }, [props]);

  return (
    <ChatRoomStartBoxDivStyle onClick={handleClick}>
      <ChatResultImgStyle
        src={props.result.profile_img}
        alt={props.result.name}
      />
      <ChatResultNameStyle>{props.result.name}</ChatResultNameStyle>
      <ChatResultIDStyle>@{props.result.user_id}</ChatResultIDStyle>
      {isCheck && <ChatResultNameStyle>✔</ChatResultNameStyle>}
    </ChatRoomStartBoxDivStyle>
  );
}

export default ChatRoomStartBox;

const ChatRoomStartBoxDivStyle = styled.div`
  text-align: center;
  margin: 0rem 0.5rem 1rem 0.5rem;
  display: inline;
`;

const ChatResultImgStyle = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

const ChatResultNameStyle = styled.p`
  font-size: 0.8rem;
`;

const ChatResultIDStyle = styled.p`
  font-size: 0.5rem;
`;
