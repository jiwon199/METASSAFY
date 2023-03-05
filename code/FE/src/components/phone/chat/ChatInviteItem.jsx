import styled from 'styled-components';

function ChatInviteItem(props) {
  return (
    <InvitedPeopleDiv>
      <InvitedImgStyle src={props.name[2]} alt="" />
      <InvitedP>{props.name[0]}</InvitedP>
    </InvitedPeopleDiv>
  );
}

export default ChatInviteItem;

const InvitedPeopleDiv = styled.div`
  display: flex;
  margin: 0rem 0.5rem;
`;

const InvitedImgStyle = styled.img`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
`;

const InvitedP = styled.p`
  font-size: 0.8rem;
  margin: 0.3rem;
`;
