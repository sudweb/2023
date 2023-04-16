import React from 'react';

import { Box, Paper, Stack, Typography } from '@mui/material';
import { GatsbyImage } from 'gatsby-plugin-image';

import EventIcon from './EventIcon';
import RenderAst from './RenderAst';

const noop = () => {};

const Event = ({
  open = true,
  onClick = noop,
  event: { type, title, htmlAst },
  authors = [],
  sx = {},
  ...props
}) => (
  <Paper
    component="article"
    sx={{
      p: 3,
      borderRadius: 2,
      ...sx,
    }}
    {...props}
  >
    <Stack direction="row" spacing={1} alignItems="flex-start">
      <EventIcon
        type={type}
        sx={{ verticalAlign: 'middle', mr: 1 }}
        onClick={onClick}
      />
      <Typography variant="h2">
        {title}
      </Typography>
    </Stack>

    <Box
      sx={{
        mt: 3,
        overflow: 'hidden',
        transition: 'max-height 250ms ease',
        maxHeight: open ? 900 : 0,
      }}
    >
      <RenderAst hast={htmlAst} />
    </Box>

    <Box component="aside">
      {authors.map(({ id, name, htmlAst: bioAst, picture }) => (
        <Stack
          key={id}
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
        >
          {/* Avatar */}
          {picture && (
            <Box sx={{ flexShrink: 0, borderRadius: 1, overflow: 'hidden' }}>
              <GatsbyImage image={picture} alt="" />
            </Box>
          )}

          <Box>
            {/* Name */}
            <Typography variant="h3">{name}</Typography>

            {/* Bio */}
            <Box
              sx={{
                overflow: 'hidden',
                transition: 'max-height 250ms ease',
                maxHeight: open ? 900 : 0,
              }}
            >
              <RenderAst hast={bioAst} options={{ bodyVariant: 'body2' }} />
            </Box>
          </Box>
        </Stack>
      ))}
    </Box>
  </Paper>
);

export default Event;
