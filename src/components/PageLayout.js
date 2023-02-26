import React from 'react';
import { Container } from '@mui/material';

import Footer from './Footer';
import Header from './Header';
import BorderBox from './BorderBox';

const nullObj = {};

const PageLayout = ({
  children,
  header = true,
  headerProps = nullObj,
  footer = true,
  footerProps = nullObj,
  ...props
}) => (
  <>
    {header && <Header h1={props.uri === '/'} {...headerProps} />}

    <Container
      maxWidth="lg"
      component="main"
      sx={{
        mt: 6,
        pb: 4,
      }}
    >
      <BorderBox variant="stack">
        {children}
      </BorderBox>

      {footer && <Footer sx={{ mt: 6 }} {...footerProps} />}
    </Container>
  </>
);

export default PageLayout;
