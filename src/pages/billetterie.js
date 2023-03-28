import React from 'react';
import { Box, Link, Typography, useTheme } from '@mui/material';

import PageLayout from '../components/PageLayout';
import BorderBox from '../components/BorderBox';
import Title from '../components/Title';
import CallToAction from '../components/CallToAction';

export const Head = () => <Title value="Billetterie" />;

const Billetterie = props => {
  const { palette: { primary: { main } } } = useTheme();

  React.useEffect(
    () => {
      const addScript = document.createElement('script');
      addScript.src = 'https://widget.weezevent.com/weez.js';
      addScript.id = 'weezevent-script';
      document.head.appendChild(addScript);

      return () => {
        const removeScript = document.getElementById('weezevent-script');
        removeScript?.parentElement?.removeChild(removeScript);
      };
    },
    [],
  );

  return (
    <PageLayout title="Devenez sponsor" {...props}>
      <BorderBox variant="simple">
        <Typography variant="h1" gutterBottom>
          Billetterie
        </Typography>

        <Typography variant="body1" paragraph>
          Oyez, oyez, vous pouvez désormais acheter vos places. Vous avez le choix entre&nbsp;:
        </Typography>

        <Box component="ul">
          <Box component="li">le pass 2 jours <em>(conférences du vendredi, la soirée, le forum ouvert du samedi)</em>,</Box>
          <Box component="li">le pass conférences du vendredi uniquement,</Box>
          <Box component="li">le pass forum ouvert du samedi uniquement.</Box>
        </Box>

        <Typography variant="body1" paragraph>
          Pour ces deux dernières, le ticket pour la soirée n’est pas inclus mais peut
          être acheté à part.
        </Typography>

        <Typography variant="body1" paragraph>
          Comme les années passées, nous avons prévu des billets à tarifs préférentiels
          pour les étudiant·e·s ainsi que pour les personnes inscrites à Pôle Emploi. Les
          billets sont disponibles sous réserve de justificatif à envoyer à{' '}
          <Link href="mailto:contact@sudweb.fr">contact@sudweb.fr</Link>. Si vous ne
          rentrez pas exactement dans ces cases, mais êtes dans une situation comparable,
          n'hésitez pas à <Link href="mailto:contact@sudweb.fr">nous contacter</Link> et
          nous en discuterons.
        </Typography>
        <Box>
          <CallToAction
            component="a"
            sx={{ mb: 2 }}
            title="Logiciel billetterie en ligne"
            href={[
              'https://www.weezevent.com/widget_billeterie.php?',
              'id_evenement=958173',
              'widget_key=E958173',
              'locale=fr_FR',
              `color_primary=${main.substring(1)}`,
              'code=67229',
              'width_auto=1',
              'neo=1',
            ].join('&')}
            className="weezevent-widget-integration"
            data-src={[
              'https://widget.weezevent.com/ticket/E958173/?',
              'id_evenement=958173',
              'lg_billetterie=1',
              'code=67229',
              'width_auto=1',
              'locale=fr-FR',
              `color_primary=${main.substring(1)}`,
            ].join('&')}
            data-width="650"
            data-height="600"
            data-id="958173"
            data-resize="1"
            data-width_auto="1"
            data-noscroll="0"
            data-use-container="yes"
            data-type="neo"
            target="_blank"
            rel="noreferrer"
          >Billetterie Weezevent
          </CallToAction>
        </Box>
      </BorderBox>
    </PageLayout>
  );
};

export default Billetterie;
