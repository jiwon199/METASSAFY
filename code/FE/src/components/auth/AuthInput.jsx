import React from 'react';
import styled from 'styled-components';

const AuthInput = (props) => {
  return (
    <WrapperStyle marginBottom={props.marginBottom}>
      <LabelStyle htmlFor="name" color={props.color}>
        {props.label}
      </LabelStyle>
      <InputStyle
        {...props}
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
      />
      {props.hasError && <ErrorText>{props.errorText}</ErrorText>}
    </WrapperStyle>
  );
};

export default AuthInput;

const WrapperStyle = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.marginBottom || '21px'};
`;

const LabelStyle = styled.label`
  font-size: 12px;
  margin-bottom: 4px;
  font-family: korail_bold;
  color: ${(props) => props.color || '#292D32'};
`;

const InputStyle = styled.input`
  height: 35px;
  border-width: 1px;
  border-color: ${(props) => (props.hasError ? '#FDA29B' : '#CED4DA')};
  border-radius: 8px;
  padding: 10px;
  border-style: solid;
  font-family: korail_light;
  font-size: 13px;
  &:focus {
    outline: none;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 3px;
  font-size: 5px;
  font-family: korail_light;
  letter-spacing: 0.5px;
`;
