import React from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  RadioGroup,
} from '@mui/material';

const SimpleRadioField = React.forwardRef(({ id, label, helperText, error, ...props }, ref) => (
  <FormControl ref={ref} variant="standard" fullWidth sx={{ mt: 4 }}>
    <Box
      component="label"
      id={id}
      sx={{
        color: error ? 'error.main' : 'text.secondary',
        fontSize: { xs: '1em', md: '1.65rem' },
        fontWeight: 500,
        lineHeight: 1.2,
      }}
    >
      {label}
    </Box>

    {helperText && (
      <FormHelperText sx={{
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

    <RadioGroup
      aria-labelledby={id}
      name={id}
      sx={{ mt: 1 }}
      {...props}
    />
  </FormControl>
));

SimpleRadioField.displayName = 'SimpleRadioField';

export default SimpleRadioField;
