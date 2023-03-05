import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const RowRadioButtonsGroup = ({ data, defaultValue, value, onChange }) => {
  const radio = data.data.map((item, index) => {
    return (
      <FormControlLabelStyle
        key={index}
        value={item.value}
        control={<RadioStyle />}
        label={item.label}
      />
    );
  });

  const [result, setResult] = useState('');
  const handleChange = (event) => {
    setResult(event.target.value);
    onChange(event);
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="radio-buttons-group"
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => handleChange(e)}
      >
        {radio}
      </RadioGroup>
    </FormControl>
  );
};

export default RowRadioButtonsGroup;

const FormControlLabelStyle = styled(FormControlLabel)(({ theme }) => ({
  //   backgroundColor: 'red',
  margin: '0.2rem',
  height: '2rem',
  display: 'flex',
  alignItems: 'center',
  '& span': {},
}));

const RadioStyle = styled(Radio)(({ theme }) => ({
  // 선택  동그라미 공간
  '& span': {
    fontSize: '0.1rem',
    padding: '0rem',
    '& svg': {
      '& path': {
        strokeWidth: '3rem',
      },
    },
  },
  // 값
  '& + span': {
    fontSize: '0.8rem',
  },
}));
