import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'gatsby-material-ui-components';

import BorderBox from './BorderBox';

const navItems = [
  // {
  //   children: <>Appel à&nbsp;sujets</>,
  //   to: '/appel-a-sujet',
  // },
  {
    children: 'Programme',
    to: '/',
  },
  {
    children: 'Les deux journées',
    to: '/les-deux-journees',
  },
  {
    children: 'Billetterie',
    to: '/billetterie',
  },
  {
    children: <>Lieux et comment venir&nbsp;?</>,
    to: '/les-lieux',
  },
  {
    children: 'Sponsors',
    to: '/sponsors',
  },
  {
    children: 'Blog',
    href: '/blog',
  },
];
const MainNav = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      px: 1.5,
    }}
  >
    <BorderBox
      borderColor="#000807"
      depth={2}
      component="nav"
      sx={{
        borderWidth: 2,
        mt: -2.5,
        px: { xs: 0.5, md: 2 },
        py: 0,
        pt: 2,
        borderRadius: 1.5,
        display: 'flex',
        alignItems: 'center',
        lineHeight: { xs: 1.1, sm: 1.4 },
        fontSize: { xs: '0.8rem', md: '1.05rem', lg: '1.25rem' },
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {navItems.map((navItem, index) => (
        <React.Fragment key={JSON.stringify(navItem)}>
          {Boolean(index) && (
            <Box
              component="span"
              sx={{ display: { md: 'initial', xs: 'none' } }}
            >
              |
            </Box>
          )}

          <Link
            key={navItem.children}
            {...navItem}
            sx={{
              display: 'inline-block',
              textAlign: 'center',
              px: { xs: 1.25, sm: 1.75 },
              py: 0.75,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
              fontStyle: 'revert',
            }}
          />
        </React.Fragment>
      ))}
    </BorderBox>
  </Box>
);

export default MainNav;
