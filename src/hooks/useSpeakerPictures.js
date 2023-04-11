import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { getImage } from 'gatsby-plugin-image';

const useSpeakerPictures = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          sourceInstanceName: { eq: "speakers" },
          extension: { in: ["jpg", "png"] }
        }
      ) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData(
              width: 100
              height: 100
              placeholder: DOMINANT_COLOR
            )
          }
        }
      }
    }
  `);

  return React.useMemo(
    () => Object.fromEntries(data?.allFile?.nodes
      .map(({ childImageSharp, name }) => [name, getImage(childImageSharp)])),
    [data?.allFile?.nodes],
  );
};

export default useSpeakerPictures;
