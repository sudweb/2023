import React from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  OutlinedInput,
} from '@mui/material';

const SimpleTextField = React.forwardRef(({ id, label, helperText, ...props }, ref) => (
  <FormControl ref={ref} variant="standard" fullWidth sx={{ mt: 4 }}>
    <Box
      component="label"
      htmlFor={id}
      sx={{
        color: 'text.secondary',
        fontSize: { xs: '1em', md: '1.65rem' },
        fontWeight: 500,
        lineHeight: 1.2,
      }}
    >
      {label}
    </Box>

    {helperText && (
      <FormHelperText
        sx={{
          color: 'text.primary',
          fontSize: { xs: '0.8em', md: '1.25rem' },
          fontStyle: 'italic',
          fontWeight: 400,
          lineHeight: 1.2,
        }}
      >
        {helperText}
      </FormHelperText>
    )}

    <OutlinedInput
      id={id}
      name={id}
      sx={{ mt: 3 }}
      {...props}
    />
  </FormControl>
));

SimpleTextField.displayName = 'SimpleTextField';

export default SimpleTextField;
