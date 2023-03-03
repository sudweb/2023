import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { Link } from 'gatsby-material-ui-components';

import BorderBox from './BorderBox';
import MainNav from './MainNav';

const Header = ({
  component = 'header',
  comeback = true,
  prelude = '',
  h1,
  pageContext,
  ...props
}) => {
  const { typography: { pxToRem } } = useTheme();

  return (
    <Box component={component} {...props}>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          pb: comeback ? 0 : '1rem',
          mb: { xs: 6, sm: 8, md: 8, lg: 12 },
        }}
      >
        <MainNav />
        <Container maxWidth="md">
          <Typography
            component={h1 ? 'h1' : Box}
            sx={{
              fontFamily: 'Oraqle Script',
              fontSize: { xs: '7rem', sm: '14rem', md: '18rem' },
              lineHeight: { xs: 1.4, sm: 1 },
              textAlign: 'center',
              textShadow: '10px 10px 0 rgba(0 0 0 / 0.6)',
              whiteSpace: 'nowrap',
            }}
          >
            <Link to="/" sx={{ textDecoration: 'none', color: 'inherit !important' }}>
              Sud Web
            </Link>
          </Typography>

          <Typography
            variant="subtitle1"
            component={Box}
            sx={{
              fontSize: { xs: '1.1rem', sm: '1.6rem', lg: '2.2rem' },
              fontStyle: 'italic',
              fontWeight: 600,
              lineHeight: 1.2,
              mt: -4,
              textAlign: 'right',
            }}
          >
            Les 2 et 3 juin 2023 à Toulouse
          </Typography>
        </Container>

        {comeback && (
          <Container
            maxWidth="lg"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <BorderBox
              borderColor="#000807"
              sx={{
                bgcolor: 'background.default',
                transform: 'translateY(50%)',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.6rem', md: '1.9rem', lg: '2.2rem' },
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                La conférence Web surtout Humaine revient&nbsp;!
              </Typography>
            </BorderBox>
          </Container>
        )}
      </Box>

      {comeback && prelude && (
        <Container maxWidth="lg">
          <Typography
            sx={{
              fontSize: {
                xs: pxToRem(18),
                sm: pxToRem(20),
                lg: pxToRem(25),
              },
              fontWeight: 700,
              lineHeight: 1.2,
              textAlign: 'center',
            }}
          >
            {prelude}
          </Typography>
        </Container>
      )}
    </Box>
  );
};

export default Header;
