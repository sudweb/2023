import React from 'react';
import { Typography } from '@mui/material';

import PageLayout from '../components/PageLayout';

const Index = props => (
  <PageLayout {...props}>
    <Typography
      variant="h2"
      sx={{ fontStyle: 'italic', fontWeight: 700 }}
      gutterBottom
    >
      Quand est-ce que vous refaites Sudweb ?
    </Typography>

    <Typography variant="body1" paragraph>
      Cette phrase fut entendue pas mal de fois l’an dernier entre Paris Web
      et le Capitole du Libre.<br />
      De nombreuses personnes ont fait preuve de nostalgie et d’attachement
      à Sudweb et demandent régulièrement si ça reviendra un jour.<br />
      En papotant avec d’anciens participants et d’anciens Thym members,
      nous nous sommes dit “et pourquoi pas ?
    </Typography>

    <Typography variant="body1" paragraph>
      Sudweb a toujours privilégié les relations humaines. Or, ces 3
      dernières années, les interactions ont pour nombre d’entre nous été
      essentiellement des échanges numériques impersonnels, et la pandémie
      de Covid-19 a renforcé cette tendance. <br />
      Nous avons alors pensé que c’était alors le bon moment pour relancer
      la machine Sudweb.<br />
      La nouvelle équipe comprend des anciens de la première heure et des
      participants enthousiastes. Et nous avons à cœur de renouer avec
      l’esprit Sudweb : une conférence humaine, de longues pauses pour
      échanger et un samedi atelier pour construire ensemble.
    </Typography>

    <Typography variant="h3" gutterBottom>
      Et pour la suite ?
    </Typography>

    <Typography variant="body1" paragraph>
      L’appel à sujets ouvrira début Mars.<br />
      La billetterie suivra juste après.
    </Typography>

    <Typography variant="body1" paragraph sx={{ fontStyle: 'italic' }}>
      La Thym 2023<br />
      Ancelin, Benjamin, Carine, Christophe, Loïc, Nathalie, Nicolas et Thanh
    </Typography>
  </PageLayout>
);

export default Index;
