import React from 'react';
import {
  Unstable_Grid2 as Grid,
  Typography,
} from '@mui/material';

import useEvents from '../hooks/useEvents';
import useSpeakers from '../hooks/useSpeakers';

import BorderBox from './BorderBox';
import TextButton from './TextButton';
import Event from './Event';

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
        {fridayEvents.map(({ id, authors, ...event }) => (
          <Grid
            item
            xs={12}
            md={showDetails.includes(id) ? 12 : 6}
            key={id}
            sx={{
              display: 'flex',
              justifyContent: 'stretch',
            }}
          >
            <Event
              open={showDetails.includes(id)}
              onClick={() => toggle(id)}
              event={event}
              authors={authors.map(author => speakers[author])}
              sx={{ flexGrow: 1 }}
            />
          </Grid>
        ))}
      </Grid>
    </BorderBox>
  );
};

export default Schedule;
