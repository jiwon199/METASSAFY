// svg를 props, text도 props - 재활용 가능
import React from 'react';
import styled from 'styled-components';

function InfoBox(props) {
  return (
    <InfoDivStyle>
      <div style={{ width: '10%', margin: '0 0.5rem' }}>{props.icon}</div>
      <div>{props.text}</div>
    </InfoDivStyle>
  );
}

export default InfoBox;

const InfoDivStyle = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid lightgray;
  margin-bottom: 1rem;
  padding-bottom: 0.3rem;
  width: 100%;
`;
