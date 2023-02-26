import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: '#9c19ec',
    },
    secondary: {
      main: '#c5478e',
    },
    background: {
      default: '#faf6e9',
    },
    text: {
      primary: '#59344F',
    },
  },
  typography: {
    fontFamily: [
      '"Plus Jakarta Sans"',
      'Helvetica',
      'Arial',
      '"sans-serif"',
    ].join(','),
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5625rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1.25rem',
      fontWeight: 400,
      lineHeight: 1.4,
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        color: 'inherit',
      },
      styleOverrides: {
        root: {
          fontStyle: 'italic',
          '&:visited': {
            color: '#7d2c55',
          },
        },
      },
    },
  },
}));

// window.theme = theme;

export default theme;
