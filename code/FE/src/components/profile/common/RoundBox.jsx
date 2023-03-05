import React from 'react';
import styled from 'styled-components';

function RoundBox(props) {
  return <RoundBoxStyle>{props.text}</RoundBoxStyle>;
}

export default RoundBox;

const RoundBoxStyle = styled.div`
  background-color: #e0f4ff;
  border-radius: 20px;
  box-shadow: inset 0 0.2rem 0.2rem rgba(0, 0, 0, 0.0500000007);
  width: 20rem;
  /* height: 10rem; */
  position: relative;
  margin: 1rem 0;
  padding: 0.7rem 0 0.7rem 1.2rem;
  font-size: 0.9rem;
  color: #617485;
`;
