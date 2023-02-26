import { Typography } from '@mui/material';
import React from 'react';

import PageLayout from '../components/PageLayout';

const NotFound = props => (
  <PageLayout
    headerProps={{
      comeback: false,
    }}
    footerProps={{
      sponsor: false,
    }}
    {...props}
  >
    <Typography variant="body1">
      Page non trouvée (erreur 404)
    </Typography>
  </PageLayout>
);

export default NotFound;
