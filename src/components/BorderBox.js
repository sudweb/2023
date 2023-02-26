import React from 'react';
import { Paper } from '@mui/material';

const BorderBox = React.forwardRef(
  ({
    sx = {},
    variant,
    borderColor = 'currentColor',
    ...props
  }, ref) => {
    const variantStyle = React.useMemo(
      () => {
        const common = {
          border: 'inherit',
          content: '""',
          display: 'block',
          inset: -3,
          position: 'absolute',
          zIndex: -1,
        };

        switch (variant) {
          case 'stack': {
            return {
              position: 'relative',
              '&:after': {
                borderRadius: 4.5,
                transform: 'translate(6px, 6px)',
                ...common,
              },
              '&:before': {
                borderRadius: 5,
                transform: 'translate(12px, 12px)',
                ...common,
              },
            };
          }
          default:
            return {
              boxShadow: `4px 4px 0 ${borderColor}`,
            };
        }
      },
      [variant, borderColor],
    );
    return (
      <Paper
        ref={ref}
        variant="outlined"
        sx={{
          borderColor,
          borderRadius: 3.5,
          borderWidth: 3,
          px: { xs: 2, md: 6 },
          py: { xs: 1, sm: 2, md: 3 },
          ...variantStyle,
          ...sx,
        }}
        {...props}
      />
    );
  },
);

BorderBox.displayName = 'BorderBox';

export default BorderBox;
