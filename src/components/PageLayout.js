import React from 'react';
import { withPrefix } from 'gatsby';
import { Box, Container, Typography } from '@mui/material';
import { MDXProvider } from '@mdx-js/react';
import { Link } from 'gatsby-material-ui-components';

import BorderBox from './BorderBox';
import Footer from './Footer';
import Header from './Header';
import CallToAction from './CallToAction';

const nullObj = {};

export const makeShortcodes = ({
  shift,
  components = nullObj,
  options: {
    bodyVariant = 'body1',
  } = nullObj,
}) => {
  const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  if (shift) {
    headings.shift();
  }

  return {
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
      <CallToAction sx={{ mb: 2, ...sx }} {...props} />
    ),
    a: ({ href, to = href, ...props }) => <Link to={to} {...props} />,
    Big: ({ sx = {}, ...props }) => (
      <Typography
        variant={bodyVariant}
        paragraph
        sx={{
          color: 'text.secondary',
          fontWeight: 600,
          fontSize: { xs: '1.8rem', md: '2.5rem' },
          lineHeight: 1.2,
          ...sx,
        }}
        {...props}
      />
    ),
    p: props => <Typography variant={bodyVariant} paragraph {...props} />,
    h1: props => <Typography variant="h1" component={headings.at(0)} gutterBottom {...props} />,
    h2: props => <Typography variant="h2" component={headings.at(1)} gutterBottom {...props} />,
    h3: props => <Typography variant="h3" component={headings.at(2)} gutterBottom {...props} />,
    h4: props => <Typography variant="h4" component={headings.at(3)} gutterBottom {...props} />,
    h5: props => <Typography variant="h5" component={headings.at(4)} gutterBottom {...props} />,
    Img: ({ sx = {}, src, ...props }) => (
      <Box
        component="img"
        sx={{
          maxWidth: '100%',
          ...sx,
        }}
        src={withPrefix(src)}
        {...props}
      />
    ),
    ...components,
  };
};

const PageLayout = ({
  children,
  header = true,
  headerProps = nullObj,
  footer = true,
  footerProps = nullObj,
  pageContext = nullObj,
}) => {
  const isHomePage = Boolean(pageContext?.frontmatter?.home);

  const shortcodes = React.useMemo(
    () => makeShortcodes({ shift: isHomePage }),
    [isHomePage],
  );

  return (
    <>
      {header && (
      <Header
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
};

export default PageLayout;
