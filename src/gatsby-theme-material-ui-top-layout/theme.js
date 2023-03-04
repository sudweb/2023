import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const TEXT_1 = '#000807';
const TEXT_2 = '#59344F';

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
      primary: TEXT_1,
      secondary: TEXT_2,
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
          '&:visited': {
            color: '#7d2c55',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          marginBottom: '1.5em',
        },
        gutterBottom: {
          marginBottom: '0.8em',
        },
        h1: { color: TEXT_2 },
        h2: { color: TEXT_2 },
        h3: { color: TEXT_2 },
        h4: { color: TEXT_2 },
        h5: { color: TEXT_2 },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow: `4px 4px 0 ${TEXT_2}`,
          '&:hover': {
            boxShadow: `4px 4px 0 ${TEXT_2}`,
          },
        },
      },
    },
  },
}));

// window.theme = theme;

export default theme;
