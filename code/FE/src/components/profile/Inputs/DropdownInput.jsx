import { styled } from '@mui/material/styles';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  NativeSelect,
} from '@mui/material';
import { useState } from 'react';

const DropdownInput = ({ data, width, value, defaultValue, onChange }) => {
  const options = data.data.map((item, index) => {
    return (
      <MenuItemStyle value={item} key={index}>
        <p>{item}</p>
      </MenuItemStyle>
    );
  });

  const [result, setResult] = useState('');
  const handleChange = (event) => {
    setResult(event.target.value);
    onChange(event);
  };

  return (
    <FormControlStyle variant="standard" sx={{ minWidth: 40, width: width }}>
      <LabelStyle id="demo-simple-select-autowidth-label">
        {data.label}
      </LabelStyle>
      <SelectStyle
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={value}
        onChange={handleChange}
        label={data.label}
        defaultValue={defaultValue}
        autoWidth
      >
        {options}
      </SelectStyle>
    </FormControlStyle>
  );
};

export default DropdownInput;

const FormControlStyle = styled(FormControl)(({}) => ({
  margin: '0.2rem',
}));

const LabelStyle = styled(InputLabel)(({}) => ({
  fontSize: '0.7rem',
  padding: '0 0.5rem',
}));

const SelectStyle = styled(Select)(({}) => ({
  fontSize: '0.8rem',
  paddingLeft: '0.3rem',
  '&::focus': {
    backgroundColor: 'red',
  },
  '&::after': {
    backgroundColor: 'blue',
  },
}));

const MenuItemStyle = styled(MenuItem)(({}) => ({
  // fontSize: '0.6rem',
  minHeight: '2rem',
  minWidth: '3.3rem',
  padding: '0 0.5rem 0 0',
  margin: '0.3rem 0.6rem 0 0.6rem',
  display: 'flex',
  justifyContent: 'end',
  borderBottom: '1px solid #D9D9D9',
  fontSize: '0.7rem',
}));
