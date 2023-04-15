import React from 'react';
import {
  Box,
  Unstable_Grid2 as Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import { GatsbyImage } from 'gatsby-plugin-image';

import useEvents from '../hooks/useEvents';
import useSpeakers from '../hooks/useSpeakers';

import BorderBox from './BorderBox';
import RenderAst from './RenderAst';
import EventIcon from './EventIcon';
import TextButton from './TextButton';

const Schedule = ({ sx = {}, ...props }) => {
  const [runtime, setRuntime] = React.useState(false);
  React.useEffect(() => { setRuntime(true); }, []);

  const events = useEvents();
  const speakers = useSpeakers();
  const fridayEvents = React.useMemo(
    () => events.filter(({ type }) => ['conference', 'lt'].includes(type)),
    [events],
  );

  const [showDetails, setShowDetails] = React.useState(fridayEvents.map(({ id }) => id));

  const toggle = React.useCallback(
    id => {
      setShowDetails(prev => {
        if (prev.includes(id)) {
          const a = new Set(prev);
          a.delete(id);
          return Array.from(a);
        }
        return [...prev, id];
      });
    },
    [],
  );

  const toggleAll = React.useCallback(
    () => {
      setShowDetails(prev => (prev.length ? [] : fridayEvents.map(({ id }) => id)));
    },
    [fridayEvents],
  );

  React.useEffect(() => { toggleAll(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BorderBox borderColor="#c5478e" sx={{ backgroundColor: '#fadff5', ...sx }} {...props}>

      <Typography variant="h1" component="h2" color="primary">
        Vendredi, faites le plein d'inspiration avec 10&nbsp;conférences et
        6&nbsp;<abbr title="conférences courtes (5 minutes)">lightning-talks</abbr>
      </Typography>

      {runtime && (
        <TextButton
          onClick={toggleAll}
          sx={{
            fontSize: '1.2em',
            mt: 3,
          }}
        >
          {!showDetails.length ? 'Déplier tout le programme ⬇️' : 'Replier tout le programme ⬆️'}
        </TextButton>
      )}

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {fridayEvents.map(({ id, type, htmlAst, title, authors }) => (
          <Grid
            item
            sm={showDetails.includes(id) ? 12 : 6}
            key={id}
            sx={{
              display: 'flex',
              justifyContent: 'stretch',
              transition: 'width 250ms ease',
            }}
          >
            <Paper component="article" sx={{ p: 3, borderRadius: 2, flexGrow: 1 }}>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <EventIcon
                  type={type}
                  sx={{ verticalAlign: 'middle', mr: 1 }}
                  onClick={() => toggle(id)}
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
                  maxHeight: showDetails.includes(id) ? 450 : 0,
                }}
              >
                <RenderAst hast={htmlAst} />
              </Box>

              <Box component="aside">
                {authors.map(author => (
                  <Stack key={author} direction="row" spacing={3}>
                    {speakers[author].picture && (
                      <Box sx={{ flexShrink: 0 }}>
                        {/* Avatar */}
                        <GatsbyImage image={speakers[author].picture} alt="" />
                      </Box>
                    )}

                    <Box>
                      {/* Name */}
                      <Typography variant="h3">{speakers[author].name}</Typography>

                      {/* Bio */}
                      <RenderAst hast={speakers[author].htmlAst} options={{ bodyVariant: 'body2' }} />
                    </Box>
                  </Stack>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </BorderBox>
  );
};

export default Schedule;
