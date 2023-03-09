import React from 'react';
import { Box, Grid,  Typography } from '@mui/material';
import { Link } from 'gatsby-material-ui-components';

import BorderBox from './BorderBox';
import FlatList from './FlatList';
import Sponsors from './Sponsors';
import footerLinks from '../data/footer-links.json';

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

    <BorderBox sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {footerLinks.map(({ title, items = [] }) => (
          <Grid item xs={12} sm={12} md={4} key={JSON.stringify({ title, items })}>
            <Typography variant="h3">{title}</Typography>

            <FlatList
              items={items.map(item => ({
                key: item.href || item.to,
                children: (<Link {...item} />),
              }))}
              sx={{ mt: 2, lineHeight: 1.6 }}
            />
          </Grid>
        ))}
      </Grid>
    </BorderBox>

    <Box sx={{ mt: 6, textAlign: 'center' }}>
      Contribué sur <Link href="https://github.com/sudweb/2023">github</Link> et
      gracieusement hébergé par <Link href="https://alwaysdata.com">alwaysdata</Link>
    </Box>
  </Box>
);

export default Footer;
