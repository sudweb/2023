import { Button } from '@mui/material';
import React from 'react';

const TextButton = React.forwardRef(({ sx = {}, ...props }, ref) => (
  <Button
    ref={ref}
    variant="text"
    sx={{
      border: 'none',
      color: 'currentcolor',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      margin: 0,
      padding: 0,
      textTransform: 'none',
      textDecoration: 'underline',
      background: 'transparent',
      '&:hover': {
        background: 'transparent',
        textDecoration: 'inherit',
      },
      ...sx,
    }}
    {...props}
  />
));

TextButton.displayName = 'TextButton';

export default TextButton;
