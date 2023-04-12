import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import useSpeakerPictures from './useSpeakerPictures';

const useSpeakers = () => {
  const pictures = useSpeakerPictures();

  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: {
          sourceInstanceName: { eq: "speakers" },
          extension: { in: ["md"] }
          childrenMarkdownRemark: { elemMatch: { frontmatter: { online: { ne: false } } } }
        }
      ) {
        nodes {
          childMarkdownRemark {
            id
            excerpt
            htmlAst
            frontmatter { name }
            parent { ... on File { name } }
          }
        }
      }
    }
  `);

  return React.useMemo(
    () => Object.fromEntries(data?.allFile?.nodes
      .map(({
        childMarkdownRemark: {
          frontmatter,
          parent: { name },
          ...rest
        },
      }) => [
        name,
        {
          ...frontmatter,
          ...rest,
          picture: pictures[name],
        },
      ])),
    [data?.allFile?.nodes, pictures],
  );
};

export default useSpeakers;
