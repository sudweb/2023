import { Box, ThemeProvider, Typography, useTheme } from '@mui/material';
import { Link } from 'gatsby-material-ui-components';
import React from 'react';
import useAltTheme from '../hooks/useAltTheme';
import BorderBox from './BorderBox';
import ynov from '../assets/ynov.svg';

const Sponsors = () => {
  const baseTheme = useTheme();
  const altTheme = useAltTheme();

  return (
    <ThemeProvider theme={altTheme}>
      <BorderBox
        sx={{
          borderColor: baseTheme.palette.text.secondary,
          boxShadow: `4px 4px 0 ${baseTheme.palette.text.secondary}`,
        }}
      >
        <Typography variant="h2" gutterBottom>
          Devenez sponsor
        </Typography>

        <Typography variant="body1" paragraph>
          Vous souhaitez devenir partenaire&nbsp;? <Link to="/sponsors">Contactez-nous pour les modalités.</Link>
        </Typography>

        <Typography variant="h2" gutterBottom>
          Nos partenaires
        </Typography>

        <Link to="https://perdu.com">
          <Box
            component="img"
            src={ynov}
            alt="YNOV Campus"
            sx={{ display: 'block' }}
          />
        </Link>
      </BorderBox>
    </ThemeProvider>
  );
};

export default Sponsors;
