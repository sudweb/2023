import React from 'react';
import { Box, Grid, Link, Typography } from '@mui/material';
import BorderBox from './BorderBox';

import editions from '../data/editions.json';
import FlatList from './FlatList';
import Sponsors from './Sponsors';

const Footer = ({
  component = 'footer',
  sponsor,
  pageContext,
  ...props
}) => (
  <Box component={component} {...props}>
    {sponsor && (
      <Sponsors />
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
          On reste en contact&nbsp;?
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
