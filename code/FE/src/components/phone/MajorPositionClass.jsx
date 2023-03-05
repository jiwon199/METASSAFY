import React from 'react';
import TextGroup from '../profile/common/TextGroup';
import styled from 'styled-components';

function MajorPositionClass(props) {
  return (
    <MajorPositionClassStyle>
      <TextGroup name={props.major} class="전공" />
      <TextGroup name={props.position} class="포지션" />
      <TextGroup name={props.track} class="트랙" />
    </MajorPositionClassStyle>
  );
}

export default MajorPositionClass;

const MajorPositionClassStyle = styled.div`
  background-color: #e0f4ff;
  border-radius: 6rem 0 0 6rem;
  box-shadow: inset 0 0.4rem 0.4rem rgba(0, 0, 0, 0.0500000007);
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  align-content: center;
  justify-content: space-around;
  width: 20rem;
  padding: 1rem 0.5rem 0.8rem 0.5rem;
`;
