import React from 'react';
import { Box } from '@mui/material';

/* eslint-disable react/jsx-key */
const FlatList = ({ sx = {}, items = [], ...props }) => (
  <Box
    component="ul"
    sx={{ m: 0, p: 0, listStyleType: 'none', ...sx }}
    {...props}
  >
    {items.map(item => (
      <Box component="li" {...item} />
    ))}
  </Box>
);

export default FlatList;
