import React from 'react';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

import PageLayout from '../components/PageLayout';
import BorderBox from '../components/BorderBox';

const Index = props => (
  <PageLayout {...props}>

    <BorderBox variant="simple">

      <Typography variant="h2" gutterBottom>
        Appel à sujets (1/2)
      </Typography>

      <Typography variant="body1" paragraph>
        Vous souhaitez proposer une conférence ou un lightning-talk à Sud Web
        pour la prochaine édition à Toulouse&nbsp;? Remplissez le formulaire
        ci-dessous avant le vendredi 07 avril 23h59.
      </Typography>

      <Typography variant="h3" gutterBottom>
        Votre conférence
      </Typography>

      <InputLabel
        htmlFor="conf-title"
        sx={{
          fontWeight: 500,
          fontSize: '25px !important',
          color: 'inherit',
          mt: 4,
          mb: 2,
        }}
      >
        Quel est le titre de votre conférence&nbsp;?
      </InputLabel>
      <FormControl variant="standard" fullWidth>
        <OutlinedInput id="conf-title" />
      </FormControl>

      <FormLabel
        id="conf-format"
        sx={{
          fontWeight: 500,
          fontSize: '25px !important',
          color: 'inherit',
          mt: 4,
          mb: 2,
          display: 'block',
        }}
      >
        Quel sera son format&nbsp;?
      </FormLabel>

      <FormControl>
        <RadioGroup
          aria-labelledby="conf-format"
          name="conf-format"
        >
          <FormControlLabel value="20 min" control={<Radio />} label="20 min" />
          <FormControlLabel value="50 min" control={<Radio />} label="50 min" />
        </RadioGroup>
      </FormControl>

      <InputLabel
        htmlFor="conf-envy"
        sx={{
          fontWeight: 500,
          fontSize: '25px !important',
          color: 'inherit',
          mt: 4,
          mb: 2,
        }}
      >
        Donnez envie au public de venir voir votre conférence.<br />
        Que devrait-il en retenir&nbsp;?
      </InputLabel>
      <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
        (Ce texte ne sera pas rendu public : c'est pour nous aider à comprendre
        ce que vous cherchez à partager.)
      </Typography>
      <FormControl variant="standard" fullWidth>
        <OutlinedInput multiline id="conf-envy" minRows={5} />
      </FormControl>

      <InputLabel
        htmlFor="conf-description"
        sx={{
          fontWeight: 500,
          fontSize: '25px !important',
          color: 'inherit',
          mt: 4,
          mb: 2,
        }}
      >
        Donnez une description de votre conférence<br />
        (qui sera celle proposée sur le site)
      </InputLabel>
      <FormControl variant="standard" fullWidth>
        <OutlinedInput multiline id="conf-description" minRows={5} />
      </FormControl>

      <Button variant="contained" sx={{ mt: 4 }}>
        Valider et continuer
      </Button>

    </BorderBox>

  </PageLayout>
);

export default Index;
