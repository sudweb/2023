import React from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  RadioGroup,
} from '@mui/material';

const SimpleRadioField = ({ id, label, helperText, ...props }) => (
  <FormControl variant="standard" fullWidth sx={{ mt: 4 }}>
    <Box component="label" id={id} sx={{}}>
      {label}
    </Box>

    {helperText && (
      <FormHelperText>{helperText}</FormHelperText>
    )}

    <RadioGroup
      aria-labelledby={id}
      name={id}
      {...props}
    />
  </FormControl>
);

export default SimpleRadioField;
