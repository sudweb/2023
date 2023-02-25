import React from 'react';
import { CacheProvider } from '@emotion/react';

// eslint-disable-next-line import/no-unresolved
import emotionCacheProps from 'material-ui-plugin-cache-endpoint';

import getEmotionCache from './get-emotion-cache';

const cache = getEmotionCache(emotionCacheProps);

export const wrapRootElement = ({ element }) =>
  <CacheProvider value={cache}>{element}</CacheProvider>;

export default {};
