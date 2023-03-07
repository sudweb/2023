import React from 'react';
import useSiteMetadata from '../hooks/useSiteMetadata';

const Title = React.forwardRef(({ value }, ref) => {
  const siteMetadata = useSiteMetadata();
  const title = value ? `SudWeb - ${value}` : siteMetadata.title;

  return (
    <>
      <title ref={ref}>{title}</title>
      <meta
        name="description"
        content={`La conférence Web surtout Humaine revient !
Après 3 ans d’absence, Sud Web revient et pose de nouveau ses valises dans la ville rose.`}
      />
    </>
  );
});

Title.displayName = 'Title';

export default Title;
