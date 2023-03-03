import React from 'react';
import { createTheme, useTheme } from '@mui/material';

const useAltTheme = () => {
  const baseTheme = useTheme();

  const innerTheme = React.useMemo(
    () => createTheme({
      ...baseTheme,
      palette: {
        mode: 'dark',
        background: {
          default: baseTheme.palette.secondary.main,
          paper: baseTheme.palette.secondary.main,
        },
      },
      components: {
        ...baseTheme.components,
        MuiLink: {
          ...baseTheme.components.MuiLink,
          defaultProps: {
            color: 'inherit',
          },
          styleOverrides: {
            ...baseTheme.components.MuiLink.styleOverrides,
            root: {
              '&:visited': {
                // https://hacks.mozilla.org/2010/03/privacy-related-changes-coming-to-css-vistited/
                color: '#ddd',
              },
            },
          },
        },
        MuiTypography: {
          ...baseTheme.components.MuiTypography,
          styleOverrides: {
            ...baseTheme.components.MuiTypography.styleOverrides,
            h1: { color: 'white' },
            h2: { color: 'white' },
            h3: { color: 'white' },
            h4: { color: 'white' },
            h5: { color: 'white' },
          },
        },
      },
    }),
    [baseTheme],
  );

  return innerTheme;
};

export default useAltTheme;
