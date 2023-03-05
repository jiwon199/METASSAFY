import React from 'react';

import { VscChromeClose } from 'react-icons/vsc';
import styled from 'styled-components';

const PhoneClose = (props) => {
  return (
    <DivStyle onClick={props.onClose}>
      <VscChromeClose color="#ADB5BD" />
    </DivStyle>
  );
};

export default PhoneClose;

const DivStyle = styled.div`
  position: absolute;
  top: 15px;
  right: 10px;
  float: right;
  cursor: pointer;
`;
