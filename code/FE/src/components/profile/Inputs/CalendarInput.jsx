import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const CalendarInput = ({ value, onChange }) => {
  const [result, setResult] = useState(dayjs('1999-12-31', 'YYYY-MM-DD'));

  const handleChange = (e) => {
    setResult(e);
    onChange(e);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePickerStyle
        label="생일"
        inputFormat="YYYY/MM/DD"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default CalendarInput;

const DesktopDatePickerStyle = styled(DesktopDatePicker)(({ theme }) => ({
  width: '11rem',

  '& input': {
    padding: '0.7rem',
    fontSize: '0.9rem',
  },
}));
