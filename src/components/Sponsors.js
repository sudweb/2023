import { Box, ThemeProvider, Typography, useTheme } from '@mui/material';
import { Link } from 'gatsby-material-ui-components';
import React from 'react';
import useAltTheme from '../hooks/useAltTheme';
import BorderBox from './BorderBox';
import ynov from '../assets/ynov.svg';
import jolicode from '../assets/jolicode.svg';
import makinacorpus from '../assets/makinacorpus.svg';

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
        <Typography variant="h1" component="h2" gutterBottom>
          Devenez sponsor
        </Typography>

        <Typography variant="body1" paragraph>
          Vous souhaitez devenir partenaire&nbsp;? <Link to="/sponsors">Contactez-nous pour les modalités</Link>.
        </Typography>

        <Typography variant="h1" component="h2" gutterBottom>
          Nos partenaires
        </Typography>

        <Box
          sx={{
            display: { xs: 'block', md: 'flex' },
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link to="https://jolicode.com/">
            <Box
              component="img"
              src={jolicode}
              alt="JoliCode"
              sx={{ display: 'block', mx: 'auto', width: '14em', maxWidth: '100%' }}
            />
          </Link>

          <Link to="https://makina-corpus.com/">
            <Box
              component="img"
              src={makinacorpus}
              alt="Makina Corpus"
              sx={{ display: 'block', mx: 'auto', width: '19em', py: 2, maxWidth: '100%' }}
            />
          </Link>

          <Link to="https://ynov-toulouse.com/">
            <Box
              component="img"
              src={ynov}
              alt="YNOV Campus"
              sx={{ display: 'block', mx: 'auto', width: '9em', maxWidth: '100%' }}
            />
          </Link>
        </Box>
      </BorderBox>
    </ThemeProvider>
  );
};

export default Sponsors;
