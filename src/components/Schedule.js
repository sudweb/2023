import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

import { Button } from 'gatsby-material-ui-components';
import { GatsbyImage } from 'gatsby-plugin-image';

import useEvents from '../hooks/useEvents';
import useSpeakers from '../hooks/useSpeakers';

import BorderBox from './BorderBox';
import RenderAst from './RenderAst';

const Schedule = ({ sx = {}, ...props }) => {
  const [showDetails, setShowDetails] = React.useState([]);

  const events = useEvents();
  const speakers = useSpeakers();

  const toggleAll = React.useCallback(
    () => {
      setShowDetails(prev => (prev.length ? [] : events.map(({ id }) => id)));
    },
    [events],
  );

  return (
    <BorderBox borderColor="#c5478e" sx={{ backgroundColor: '#fadff5', ...sx }} {...props}>

      <Typography variant="h1" component="h2">
        Vendredi, faites le plein d'inspiration avec 11&nbsp;conférences et
        6&nbsp;<abbr title="conférences courtes (5 minutes)">lightning-talks</abbr>
      </Typography>

      <Button onClick={toggleAll}>Déplier tout le programme  ⬇</Button>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {events.map(({ id, htmlAst, title, authors }) => (
          <Grid item sm={6} key={id}>
            <Paper component="article" sx={{ p: 2, borderRadius: 2 }}>
              <Typography variant="h2">{title}</Typography>

              <Box component="aside">
                {authors.map(author => (
                  <Box key={author}>
                    {/* Avatar */}
                    {speakers[author].picture && (
                      <GatsbyImage image={speakers[author].picture} alt="" />
                    )}

                    {/* Name */}
                    <Typography variant="h3">{speakers[author].name}</Typography>

                    {/* Bio */}
                    <Typography variant="body1" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                      {speakers[author].excerpt}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  overflow: 'hidden',
                  maxHeight: showDetails.includes(id) ? 450 : 0,
                  transition: 'max-height 250ms ease',
                }}
              >
                <RenderAst hast={htmlAst} />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </BorderBox>
  );
};

export default Schedule;
