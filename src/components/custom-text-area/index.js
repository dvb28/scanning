import * as React from 'react';
import { TextField } from '@mui/material';

export default function CustomTextArea({ desc = '', value = '', onChange = null }) {
  return (
    <TextField
      fullWidth
      margin='normal'
      multiline
      minRows={3}
      label={desc}
      value={value}
      onChange={(e) => (onChange ? onChange(e.target.value) : null)}
    />
  );
}
