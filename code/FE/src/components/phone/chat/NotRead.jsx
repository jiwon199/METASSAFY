import styled from 'styled-components';

function NotRead(props) {
  return (
    <ChatText style={props.who === 'me' ? ChatStyle : null}>
      {props.notRead}
    </ChatText>
  );
}

export default NotRead;

const ChatText = styled.p`
  font-size: 0.5rem;
  align-self: flex-end;
  padding: 0rem 0.3rem;
  color: #50a6b6a1;
`;

const ChatStyle = {
  textAlign: 'right',
};
