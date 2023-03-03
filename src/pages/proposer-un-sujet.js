import React from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';

import PageLayout from '../components/PageLayout';
import BorderBox from '../components/BorderBox';
import SimpleTextField from '../components/SimpleTextField';
import SimpleRadioField from '../components/SimpleRadioField';

const SubjectForm = props => (
  <PageLayout {...props}>
    <BorderBox variant="simple">
      <Typography variant="h2" component="h1" gutterBottom>
        Appel à sujets
      </Typography>

      <Box>
        <Typography variant="body1" paragraph sx={{ fontWeight: 500 }}>
          Vous souhaitez proposer une conférence ou un lightning-talk à Sud Web
          pour la prochaine édition à Toulouse&nbsp;? Remplissez le formulaire
          ci-dessous avant le vendredi 07 avril 23h59.
        </Typography>

        <Typography variant="h3" component="h2" gutterBottom>
          Votre conférence
        </Typography>

        <SimpleTextField
          id="conf-title"
          label="Quel sera le titre de votre conférence&nbsp;?"
        />

        <SimpleRadioField
          id="conf-format"
          label="Quel sera son format&nbsp;?"
        >
          <FormControlLabel value="20 min" control={<Radio />} label="20 min" />
          <FormControlLabel value="50 min" control={<Radio />} label="50 min" />
        </SimpleRadioField>

        <SimpleTextField
          id="conf-envy"
          label="Aidez nous à comprendre votre contenu. Dites-nous ce qui donnera envie au public de venir voir votre conférence. Que devrait-il en retenir&nbsp;?"
          helperText="(Ce texte ne sera pas rendu public : c'est pour nous aider à comprendre ce que vous cherchez à partager.)"
          multiline
          minRows={5}
        />

        <SimpleTextField
          id="conf-description"
          label="Donnez une description de votre conférence (qui sera celle proposée sur le site)"
          multiline
          minRows={5}
        />

        <Box sx={{ textAlign: 'center' }}>
          <Button variant="contained" sx={{ mt: 4 }}>
            Valider et continuer
          </Button>
        </Box>
      </Box>

      <Box>
        <Typography variant="h3" component="h2" gutterBottom>
          Vous
        </Typography>

        <SimpleTextField
          id="speaker-name"
          label="Vos prénom et nom"
        />

        <SimpleTextField
          id="speaker-email"
          label="Votre adresse e-mail"
          type="email"
        />

        <SimpleTextField
          id="speaker-location"
          label="Où êtes-vous situé·e&nbsp;?"
        />

        <SimpleRadioField
          id="speaker-expenses"
          label="Aurez-vous besoin d’une prise en charge de votre déplacement et d’un hébergement ?"
          helperText="(c’est à titre indicatif pour nous donner une idée des réservations à effectuer. Nous revaliderons avec vous si votre sujet est retenu)"
        >
          <FormControlLabel value="Déplacement + hébergement" control={<Radio />} label="Une prise en charge de mon déplacement et de mon hébergement" />
          <FormControlLabel value="Déplacement" control={<Radio />} label="Juste de mon déplacement" />
          <FormControlLabel value="Hébergement" control={<Radio />} label="Juste de mon hébergement" />
          <FormControlLabel value="Rien" control={<Radio />} label="Pas besoin, merci" />
        </SimpleRadioField>

        <SimpleRadioField
          id="speaker-help"
          label="Souhaitez-vous bénéficier d’un coaching ou d’une aide particulière pour préparer ou finaliser votre conférence ?"
          helperText="(c’est à titre indicatif. Nous affinerons votre demande si votre sujet est retenu)"
        >
          <FormControlLabel value="Accompagnement" control={<Radio />} label="Oui je veux bien un accompagnement" />
          <FormControlLabel value="" control={<Radio />} label="Pas besoin, merci" />
        </SimpleRadioField>

        <SimpleTextField
          id="speaker-needs"
          label="Avez-vous besoin d’aide concernant votre venue, votre proposition ou n’importe quel autre aspect de ce Sud Web ? (Facultatif)"
          helperText="(ça ne sera pas publié sur le site)"
          multiline
          minRows={5}
        />

        <Box sx={{ textAlign: 'center' }}>
          <Button variant="contained" sx={{ mt: 4 }}>
            Valider et soumettre
          </Button>
        </Box>
      </Box>

    </BorderBox>

  </PageLayout>
);

export default SubjectForm;
