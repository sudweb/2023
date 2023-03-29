import React from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  OutlinedInput,
} from '@mui/material';

const SimpleTextField = React.forwardRef(({
  id,
  label,
  helperText,
  onChange,
  maxLength,
  ...props
}, ref) => {
  const [value, setValue] = React.useState('');

  const handleChange = React.useCallback(
    event => {
      onChange(event);
      setValue(event.target.value);
    },
    [onChange],
  );

  return (
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
        onChange={handleChange}
        inputProps={{ maxLength }}
        {...props}
      />
      {Boolean(maxLength) && (
        <Box
          sx={{
            textAlign: 'right',
            fontSize: '0.8rem',
            color: value.length >= maxLength
              ? 'error.main'
              : 'currentColor',
          }}
        >
          {value.length} / {maxLength}
        </Box>
      )}
    </FormControl>
  );
});

SimpleTextField.displayName = 'SimpleTextField';

export default SimpleTextField;
