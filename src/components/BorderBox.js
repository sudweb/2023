import React from 'react';
import { Paper, ThemeProvider, useTheme } from '@mui/material';
import useAltTheme from '../hooks/useAltTheme';

const BorderBox = React.forwardRef(
  ({
    sx = {},
    variant,
    borderColor = 'currentColor',
    depth = 4,
    alt,
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
                transform: `translate(${depth * 1.5}px, ${depth * 1.5}px)`,
                ...common,
              },
              '&:before': {
                borderRadius: 5,
                transform: `translate(${depth * 3}px, ${depth * 3}px)`,
                ...common,
              },
            };
          }
          case 'simple': {
            return {};
          }
          default:
            return {
              boxShadow: {
                xs: `${depth / 2}px ${depth / 2}px 0 ${borderColor}`,
                sm: `${depth}px ${depth}px 0 ${borderColor}`,
              },
            };
        }
      },
      [variant, depth, borderColor],
    );

    const baseTheme = useTheme();
    const altTheme = useAltTheme();

    return (
      <ThemeProvider theme={alt ? altTheme : baseTheme}>
        <Paper
          ref={ref}
          variant="outlined"
          sx={{
            borderColor,
            borderRadius: 3.5,
            borderWidth: 3,
            px: { xs: 2, md: 6 },
            py: { xs: 1, sm: 2, md: 5 },
            ...variantStyle,
            ...sx,
          }}
          {...props}
        />
      </ThemeProvider>
    );
  },
);

BorderBox.displayName = 'BorderBox';

export default BorderBox;
