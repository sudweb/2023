import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

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
