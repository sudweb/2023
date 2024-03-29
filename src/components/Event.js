import React from 'react';

import { Box, Paper, Stack, Typography } from '@mui/material';
import { GatsbyImage } from 'gatsby-plugin-image';

import EventIcon from './EventIcon';
import RenderAst from './RenderAst';

const noop = () => {};

const Event = ({
  open = true,
  onClick = noop,
  event: { type, title, name: anchor, htmlAst },
  authors = [],
  sx = {},
  ...props
}) => (
  <Paper
    component="article"
    id={anchor}
    sx={{
      p: 3,
      borderRadius: 2,
      ...sx,
    }}
    {...props}
  >
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-start">
      <EventIcon type={type} onClick={onClick} />
      <Typography variant="h2">{title}</Typography>
    </Stack>

    {open && (
      <Box sx={{ mt: 3 }}>
        <RenderAst hast={htmlAst} />
      </Box>
    )}

    <Box component="aside" sx={{ mt: 2 }}>
      {authors.map(({ id, name, htmlAst: bioAst, picture }) => (
        <Stack
          key={id}
          direction={{ xs: 'column', md: 'row' }}
          spacing={3}
        >
          {/* Avatar */}
          {picture && (
            <Box sx={{ flexShrink: 0, overflow: 'hidden' }}>
              <Box component={GatsbyImage} image={picture} alt="" sx={{ borderRadius: 1 }} />
            </Box>
          )}

          <Box>
            {/* Name */}
            <Typography variant="h3">{name}</Typography>

            {/* Bio */}
            {open && (
              <Box>
                <RenderAst
                  hast={bioAst}
                  options={{ bodyVariant: 'body2' }}
                  sx={{ 'p:last-child': { mb: 0 } }}
                />
              </Box>
            )}
          </Box>
        </Stack>
      ))}
    </Box>
  </Paper>
);

export default Event;
