import React from 'react';
import { Box } from '@mui/material';

import Rehype2react from 'rehype-react';
import { makeShortcodes } from './PageLayout';

const nullObj = {};

const RenderAst = ({ hast, components = nullObj, options = nullObj, ...props }) => {
  const shortcodes = React.useMemo(
    () => makeShortcodes({ components, options }),
    [components, options],
  );

  const renderAst = new Rehype2react({
    createElement: React.createElement,
    Fragment: React.Fragment,
    components: shortcodes,
  }).Compiler;

  return (
    <Box {...props}>{renderAst(hast)}</Box>
  );
};

export default RenderAst;
