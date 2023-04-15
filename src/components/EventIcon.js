import React from 'react';
import { Box } from '@mui/material';
import { withPrefix } from 'gatsby';

const EventIcon = ({ type, ...props }) => (
  <Box
    component="img"
    alt=""
    src={withPrefix(`/images/${type}.svg`)}
    {...props}
  />
);

export default EventIcon;
