import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { Link } from 'gatsby-material-ui-components';

import BorderBox from './BorderBox';
import MainNav from './MainNav';

const BLOG_LINK = 'https://sudweb.fr/blog/2023/quand-est-ce-que-vous-refaites-sudweb/';

const Header = ({
  component = 'header',
  comeback = true,
  prelude = '',
  h1,
  pageContext,
  ...props
}) => {
  const {
    typography: { pxToRem },
    palette,
  } = useTheme();

  return (
    <Box component={component} {...props}>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          pb: 4,
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
      </Box>

      {comeback && (
        <Box
          sx={{
            background: `linear-gradient(0deg, transparent 50%, ${palette.primary.main} 50%)`,
          }}
        >
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
                py: { xs: 1, sm: 2, md: 3 },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '1.2rem', sm: '1.6rem', md: '1.9rem', lg: '2.2rem' },
                  fontWeight: 600,
                  lineHeight: 1.2,
                  color: 'text.secondary',
                }}
              >
                La conférence Web surtout Humaine revient&nbsp;!
              </Typography>
            </BorderBox>
          </Container>
        </Box>
      )}

      {prelude && (
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
              color: 'text.secondary',
              mt: 5,
            }}
          >
            Après 3 ans d’absence, <Link to={BLOG_LINK}>Sud Web revient</Link> et
            pose de nouveau ses valises dans la ville rose.
          </Typography>
        </Container>
      )}
    </Box>
  );
};

export default Header;
