import React from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  OutlinedInput,
} from '@mui/material';

const SimpleTextField = ({ id, label, helperText, ...props }) => (
  <FormControl variant="standard" fullWidth sx={{ mt: 4 }}>
    <Box component="label" htmlFor={id} sx={{}}>
      {label}
    </Box>

    {helperText && (
      <FormHelperText>{helperText}</FormHelperText>
    )}

    <OutlinedInput id={id} {...props} />
  </FormControl>
);

export default SimpleTextField;
