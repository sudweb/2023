import React from 'react';
import { ThemeProvider, Typography } from '@mui/material';

import BorderBox from './BorderBox';
import useAltTheme from '../hooks/useAltTheme';

const Workshops = ({ sx = {}, ...props }) => {
  const altTheme = useAltTheme();

  return (
    <ThemeProvider theme={altTheme}>
      <BorderBox
        variant="simple"
        borderColor="#000807"
        sx={{ backgroundColor: '#9c19ec', ...sx }}
        {...props}
      >
        <Typography variant="h1" component="h2">
          Samedi, le forum ouvert
        </Typography>
      </BorderBox>
    </ThemeProvider>
  );
};

export default Workshops;
