import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const useEvents = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: {
        sourceInstanceName: { eq: "events" }
      }) {
        nodes {
          childMarkdownRemark {
            id
            excerpt
            htmlAst
            frontmatter {
              title
              type
              authors
            }
            parent { ... on File { name } }
          }
        }
      }
    }
  `);

  return React.useMemo(
    () => data?.allFile?.nodes
      .map(({
        childMarkdownRemark: {
          frontmatter,
          parent: { name },
          ...rest
        },
      }) => ({ name, ...frontmatter, ...rest })),
    [data?.allFile?.nodes],
  );
};

export default useEvents;
