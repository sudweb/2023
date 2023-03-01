import React from 'react';
import { Box, Grid, Link, Typography } from '@mui/material';
import BorderBox from './BorderBox';

import editions from '../data/editions.json';
import FlatList from './FlatList';

const Footer = ({
  component = 'footer',
  sponsor,
  ...props
}) => (
  <Box component={component} {...props}>
    {sponsor && (
    <BorderBox color="secondary">
      <Typography variant="h2" gutterBottom>
        Devenez sponsor
      </Typography>

      <Typography variant="body1" paragraph>
        Devenez sponsor
      </Typography>

      <Typography variant="h2" gutterBottom>
        Nos partenaires
      </Typography>

      YNOV
    </BorderBox>
    )}

    <BorderBox container component={Grid} sx={{ mt: 6 }}>
      <Grid item xs={12} sm={12} md={4}>
        <Typography variant="h4">
          Épisodes précédents
        </Typography>

        <FlatList
          items={editions.map(edition => ({
            key: edition.href,
            children: (<Link {...edition} />),
          }))}
          sx={{ mt: 2, lineHeight: 1.6 }}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={4}>
        <Typography variant="h4">
          Pour en savoir plus
        </Typography>
      </Grid>

      <Grid item xs={12} sm={12} md={4}>
        <Typography variant="h4">
          On reste en contact ?
        </Typography>
      </Grid>
    </BorderBox>

    <Box sx={{ mt: 6, textAlign: 'center' }}>
      Contribué sur <Link href="https://github.com/sudweb">github</Link> et
      gracieusement hébergé par <Link href="https://alwaysdata.com">alwaysdata</Link>
    </Box>
  </Box>
);

export default Footer;
