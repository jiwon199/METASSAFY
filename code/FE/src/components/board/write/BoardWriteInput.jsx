import styled from 'styled-components';

const BoardWriteInput = ({ type, label, placeholder, value, setValue }) => {
  const changeHandler = (e) => {
    setValue((state) => {
      return { ...state, [type]: e.target.value };
    });
  };

  return (
    <InputWrapper>
      <TitleDiv>{label}</TitleDiv>
      {type === 'title' && (
        <InputStyle
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={changeHandler}
        />
      )}
      {type === 'content' && (
        <TextareaStyle
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={changeHandler}
        />
      )}
    </InputWrapper>
  );
};

export default BoardWriteInput;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleDiv = styled.div`
  width: 100%;
  background-color: #e0f4ff;
  height: 2rem;
  border-radius: 20px;
  font-size: 0.8rem;
  padding: 0.7rem 1.3rem;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.132);
  color: #617485;
`;

const InputStyle = styled.input`
  width: 98%;
  padding: 0.3rem;
  margin: 0.5rem;
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  color: #617485;
  border-bottom: 1px solid #cccccc;

  &:active,
  &:focus {
    outline: none;
  }
`;

const TextareaStyle = styled.textarea`
  width: 100%;
  min-height: 17rem;
  padding: 1rem;
  margin: 0.5rem;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  color: #617485;
  border: none;
  resize: none;

  &:active,
  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 0.3rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #617485;
    border-radius: 10px;
    background-clip: padding-box;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;
