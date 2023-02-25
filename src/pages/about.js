import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'gatsby-material-ui-components';

import ProTip from '../components/ProTip';
import Copyright from '../components/Copyright';

const About = () => (
  <Container maxWidth="sm">
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Material UI Gatsby example
      </Typography>

      <Link to="/">Go home</Link>

      <ProTip />
      <Copyright />
    </Box>
  </Container>
);

export default About;
