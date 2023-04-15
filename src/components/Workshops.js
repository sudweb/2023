import React from 'react';
import { withPrefix } from 'gatsby';
import {
  Box,
  Unstable_Grid2 as Grid,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
  useTheme,
} from '@mui/material';

import BorderBox from './BorderBox';
import useAltTheme from '../hooks/useAltTheme';
import useEvents from '../hooks/useEvents';
import useSpeakers from '../hooks/useSpeakers';
import Event from './Event';

const forumStyle = {
  p: 2.5,
  background: '#faf6e9',
  width: 140,
  height: 140,
  display: 'flex',
  mx: 'auto',
  mb: 2,
};

const Workshops = ({ sx = {}, ...props }) => {
  const altTheme = useAltTheme();
  const baseTheme = useTheme();

  const events = useEvents();
  const speakers = useSpeakers();
  const workshops = React.useMemo(
    () => events.filter(({ type }) => ['atelier'].includes(type)),
    [events],
  );

  return (
    <ThemeProvider theme={altTheme}>
      <BorderBox
        variant="simple"
        borderColor="#000807"
        sx={{ backgroundColor: '#9c19ec', ...sx }}
        {...props}
      >
        <Typography variant="h1" component="h2">
          Samedi, le forum ouvert
        </Typography>

        <ThemeProvider theme={baseTheme}>
          <BorderBox
            variant="simple"
            borderColor="#000807"
            sx={{ mt: 6 }}
          >
            <Typography variant="h1" component="h2">
              Le forum ouvert c'est quoi ?
            </Typography>

            <Typography variant="body1" sx={{ mt: 6 }}>
              Depuis  2014, Sud Web a mis en place le principe du forum ouvert.
              Il n’y a pas de programme pré-établi, c’est VOUS qui faites la
              journée.
            </Typography>

            <Grid container spacing={3} sx={{ mt: 6, textAlign: 'center', fontWeight: 'bold' }}>
              <Grid item xs={4}>
                <Paper elevation={0} sx={forumStyle}>
                  <Box component="img" src={withPrefix('/images/forum-1.svg')} alt="" />
                </Paper>
                Une journée auto-organisée dont vous êtes les principaux acteurs.
              </Grid>

              <Grid item xs={4}>
                <Paper elevation={0} sx={forumStyle}>
                  <Box component="img" src={withPrefix('/images/forum-2.svg')} alt="" />
                </Paper>
                Vous êtes libres de passer d’une session à l’autre à tout moment.
              </Grid>

              <Grid item xs={4}>
                <Paper elevation={0} sx={forumStyle}>
                  <Box component="img" src={withPrefix('/images/forum-3.svg')} alt="" />
                </Paper>
                Vous soumettez des sujets sur lesquels vous réfléchissez avec
                les autres participants.
              </Grid>
            </Grid>
          </BorderBox>
        </ThemeProvider>

        <Typography variant="h1" component="h2" sx={{ mt: 4 }}>
          Quatre principes et une loi
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{ mt: 6, textAlign: 'center', fontWeight: 'bold' }}
        >
          <Grid item xs={3}>
            <Box
              component="img"
              src={withPrefix('/images/loi-1.svg')}
              alt=""
              sx={{ display: 'block', mx: 'auto', mb: 2 }}
            />
            Les personnes présentes sont les bonnes personnes
          </Grid>

          <Grid item xs={3}>
            <Box
              component="img"
              src={withPrefix('/images/loi-2.svg')}
              alt=""
              sx={{ display: 'block', mx: 'auto', mb: 2 }}
            />
            Il arrive ce qui pouvait arriver de mieux
          </Grid>

          <Grid item xs={3}>
            <Box
              component="img"
              src={withPrefix('/images/loi-3.svg')}
              alt=""
              sx={{ display: 'block', mx: 'auto', mb: 2 }}
            />
            Ça commence quand ça commence
          </Grid>

          <Grid item xs={3}>
            <Box
              component="img"
              src={withPrefix('/images/loi-4.svg')}
              alt=""
              sx={{ display: 'block', mx: 'auto', mb: 2 }}
            />
            Ça finit quand c’est fini
          </Grid>
        </Grid>

        <Typography variant="body1" sx={{ mt: 4 }}>
          Partons sur des bases saines : c’est vous qui contribuez et qui
          construisez cette journée afin d'en retirer le maximum. Si aucun des
          sujets proposés ne vous convient, alors à vous d’en proposer un.
          Le cadre est posé, maintenant il ne vous reste plus qu'à retenir
          une chose :
        </Typography>

        <Grid container sx={{ mt: 4 }}>
          <Grid item flexGrow={0} flexShrink={0}>
            <Box
              component="img"
              src={withPrefix('/images/deux-pieds.svg')}
              alt=""
            />
          </Grid>

          <Grid item xs>
            <Typography variant="h3">
              La loi des deux pieds
            </Typography>

            <Typography variant="body1" sx={{ mt: 2 }}>
              À partir du moment où vous n’êtes plus en train d’apprendre ni de
              contribuer, vous êtes libres à tout moment de changer de session.
              Allez et venez autant que vous le voulez.
            </Typography>
          </Grid>
        </Grid>


        <ThemeProvider theme={baseTheme}>
          <BorderBox
            variant="simple"
            borderColor="#000807"
            sx={{ mt: 6 }}
          >
            <Typography variant="h1" component="h2">
              Quatre ateliers pour démarrer
            </Typography>

            <Stack spacing={2} sx={{ mt: 2 }}>
              {workshops.map(({ id, authors, ...event }, index) => (
                <Event
                  key={id}
                  open
                  event={event}
                  authors={authors.map(author => speakers[author])}
                  elevation={0}
                  sx={{ background: index % 2 ? 'transparent' : '#faf6e9' }}
                />
              ))}
            </Stack>

          </BorderBox>
        </ThemeProvider>

      </BorderBox>
    </ThemeProvider>
  );
};

export default Workshops;
