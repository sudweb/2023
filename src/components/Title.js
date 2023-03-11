import React from 'react';
import useSiteMetadata from '../hooks/useSiteMetadata';
import socialCard from '../assets/social-card.png';

const Title = React.forwardRef(({ value }, ref) => {
  const siteMetadata = useSiteMetadata();
  const title = value ? `SudWeb 2023 - ${value}` : siteMetadata.title;

  return (
    <>
      <title ref={ref}>{title}</title>
      <meta
        name="description"
        content={`La conférence Web surtout Humaine revient !
Après 3 ans d’absence, Sud Web revient et pose de nouveau ses valises dans la ville rose.`}
      />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={socialCard} />
      <meta property="og:image:width" content="942" />
      <meta property="og:image:width" content="558" />
      <meta property="og:image:type" content="image/png" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@sudweb" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={socialCard} />
    </>
  );
});

Title.displayName = 'Title';

export default Title;
