import React, { Fragment } from 'react';

import styled from 'styled-components';

const AuthTitle = (props) => {
  return (
    <Fragment>
      <SubTitleStyle>{props.subTitle}</SubTitleStyle>
      <TitleStyle>{props.title}</TitleStyle>
    </Fragment>
  );
};

export default AuthTitle;

const SubTitleStyle = styled.h3`
  font-family: 'korail_bold';
  text-align: center;
  margin: 38px 0 10px 0;
  font-size: 20px;
  color: #aa98e9;
  letter-spacing: -1px;
`;

const TitleStyle = styled.h3`
  font-family: 'korail_bold';
  text-align: center;
  color: #98c3e9;
  font-size: 30px;
  margin: 0 0 30px 0;
`;
