import React from 'react';
import { Container, Typography } from '@mui/material';
import { MDXProvider } from '@mdx-js/react';
import { Button, Link } from 'gatsby-material-ui-components';

import BorderBox from './BorderBox';
import Footer from './Footer';
import Header from './Header';

const nullObj = {};

const shortcodes = {
  Cadre: ({ sx = {}, ...props }) => (
    <BorderBox
      variant="stack"
      sx={{
        pt: { xs: 2, sm: 4, md: 6 },
        pb: { xs: 2, sm: 4 },
        ...sx,
      }}
      {...props}
    />
  ),
  CTA: ({ sx = {}, ...props }) => (
    <Button variant="contained" sx={{ mb: 2, ...sx }} {...props} />
  ),
  a: ({ href, to = href, ...props }) => <Link to={to} {...props} />,
  p: props => <Typography variant="body1" paragraph {...props} />,
  h1: props => <Typography variant="h1" gutterBottom {...props} />,
  h2: props => <Typography variant="h2" gutterBottom {...props} />,
  h3: props => <Typography variant="h3" gutterBottom {...props} />,
  h4: props => <Typography variant="h4" gutterBottom {...props} />,
  h5: props => <Typography variant="h5" gutterBottom {...props} />,
  h6: props => <Typography variant="h6" gutterBottom {...props} />,
};

const PageLayout = ({
  children,
  header = true,
  headerProps = nullObj,
  footer = true,
  footerProps = nullObj,
  pageContext = nullObj,
  ...props
}) => (
  <>
    {header && (
      <Header
        h1={props.uri === '/'}
        pageContext={pageContext}
        prelude={pageContext?.frontmatter?.prelude}
        {...headerProps}
      />
    )}

    <Container
      maxWidth="lg"
      component="main"
      sx={{
        mt: 6,
        pb: 4,
      }}
    >
      <MDXProvider components={shortcodes}>
        {children}
      </MDXProvider>

      {footer && (
        <Footer
          sx={{ mt: 4 }}
          pageContext={pageContext}
          sponsor={pageContext?.frontmatter?.sponsor}
          {...footerProps}
        />
      )}
    </Container>
  </>
);

export default PageLayout;
