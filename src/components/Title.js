import React from 'react';
import useSiteMetadata from '../hooks/useSiteMetadata';

const Title = React.forwardRef(({ value }, ref) => {
  const siteMetadata = useSiteMetadata();
  const title = value ? `SudWeb - ${value}` : siteMetadata.title;

  return (
    <title ref={ref}>{title}</title>
  );
});

Title.displayName = 'Title';

export default Title;
