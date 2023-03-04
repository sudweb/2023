import { useTheme } from '@mui/material';
import { Button } from 'gatsby-material-ui-components';
import React from 'react';

const CallToAction = React.forwardRef(({ sx = {}, ...props }, ref) => {
  const { palette: { text } } = useTheme();

  return (
    <Button
      variant="contained"
      ref={ref}
      sx={{
        textTransform: 'none',
        fontSize: {
          xs: '1.2rem',
          sm: '1.6rem',
          md: '1.9rem',
          lg: '2.2rem',
        },
        lineHeight: 1.2,
        fontWeight: 700,
        py: 1.5,
        px: 4,
        borderRadius: '10px',
        boxShadow: `4px 4px 0 ${text.secondary}`,

        '&:hover': {
          boxShadow: `4px 4px 0 ${text.secondary}`,
        },
        ...sx,
      }}
      {...props}
    />
  );
});

CallToAction.displayName = 'CallToAction';

export default CallToAction;
