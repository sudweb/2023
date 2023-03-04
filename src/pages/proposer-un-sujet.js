import React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  FormControlLabel,
  GlobalStyles,
  Radio,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { navigate, withPrefix } from 'gatsby';

import PageLayout from '../components/PageLayout';
import BorderBox from '../components/BorderBox';
import SimpleTextField from '../components/SimpleTextField';
import SimpleRadioField from '../components/SimpleRadioField';
import CallToAction from '../components/CallToAction';

const required = true;

const inputGlobalStyles = (
  <GlobalStyles styles={{
    'input[type="radio"]': {
      opacity: 1,
      transform: 'scale(45%)',
    },
  }}
  />
);

const titles = {
  'conf-title': 'un titre pour votre conférence',
  'conf-format': 'sa durée',
  'conf-envy': 'son contexte',
  'conf-description': 'la description',
  'speaker-name': 'vos prénom et nom',
  'speaker-email': 'une adresse e-mail pour vous contacter',
  'speaker-location': 'là d\'où vous venez',
  'speaker-expenses': 'vos besoins de prise en charge',
  'speaker-coaching': 'votre souhait d\'être accompagné ou non',
};

const SubjectForm = props => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [step, setStep] = React.useState(0);
  const [runtime, setRuntime] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(
    () => {
      setRuntime(true);
    },
    [],
  );

  const onSubmit = async data => {
    setLoading(true);
    const response = await fetch(
      withPrefix('/api/proposition'),
      {
        method: 'POST',
        'content-type': 'application/json',
        body: JSON.stringify({
          ...data,
          redirect: false,
        }),
      },
    );
    if (response.status === 201) {
      navigate('/merci');
    } else {
      navigate('/erreur');
    }
  };

  return (
    <PageLayout {...props}>
      {!runtime && inputGlobalStyles}
      <BorderBox variant="simple">
        <Typography variant="h2" component="h1" gutterBottom>
          Appel à sujets {step > 0 && `(${step}/2)`}
        </Typography>

        <Box
          component="form"
          action={withPrefix('/api/proposition')}
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box sx={{ display: step < 2 ? 'block' : 'none' }}>
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
              {...register('conf-title', { required: true })}
              error={Boolean(errors?.['conf-title']?.type)}
              label="Quel sera le titre de votre conférence&nbsp;?"
              required={required}
            />

            <SimpleRadioField
              id="conf-format"
              error={Boolean(errors?.['conf-format']?.type)}
              label="Quel sera son format&nbsp;?"
            >
              <FormControlLabel value="20 minutes" control={<Radio required={required} {...register('conf-format', { required: true })} />} label="20 min" />
              <FormControlLabel value="5 minutes" control={<Radio required={required} {...register('conf-format', { required: true })} />} label="5 min" />
            </SimpleRadioField>

            <SimpleTextField
              id="conf-envy"
              {...register('conf-envy', { required: true })}
              error={Boolean(errors?.['conf-envy']?.type)}
              label="Aidez nous à comprendre votre contenu. Dites-nous ce qui donnera envie au public de venir voir votre conférence. Que devrait-il en retenir&nbsp;?"
              helperText="(Ce texte ne sera pas rendu public : c'est pour nous aider à comprendre ce que vous cherchez à partager.)"
              multiline
              minRows={5}
              rows={runtime ? undefined : 5}
              required={required}
            />

            <SimpleTextField
              id="conf-description"
              {...register('conf-description', { required: true })}
              error={Boolean(errors?.['conf-description']?.type)}
              label="Donnez une description de votre conférence (qui sera celle proposée sur le site)"
              multiline
              minRows={5}
              rows={runtime ? undefined : 5}
              required={required}
            />

            {step > 0 && (
              <Box sx={{ textAlign: 'center' }}>
                <CallToAction
                  variant="contained"
                  sx={{ mt: 4 }}
                  onClick={() => {
                    setStep(2);
                    window?.scrollTo?.(0, 0);
                  }}
                >
                  Valider et continuer
                </CallToAction>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              display: (step < 1 || step > 1) ? 'block' : 'none',
              mt: 8,
            }}
          >
            <Typography variant="h3" component="h2" gutterBottom>
              Vous
            </Typography>

            <SimpleTextField
              id="speaker-name"
              {...register('speaker-name', { required: true })}
              error={Boolean(errors?.['speaker-name']?.type)}
              label="Vos prénom et nom"
              required={required}
            />

            <SimpleTextField
              id="speaker-email"
              {...register('speaker-email', { required: true })}
              error={Boolean(errors?.['speaker-email']?.type)}
              label="Votre adresse e-mail"
              type="email"
              required={required}
            />

            <SimpleTextField
              id="speaker-location"
              {...register('speaker-location', { required: true })}
              error={Boolean(errors?.['speaker-location']?.type)}
              label="Où êtes-vous situé·e&nbsp;?"
              required={required}
            />

            <SimpleRadioField
              id="speaker-expenses"
              error={Boolean(errors?.['speaker-expenses']?.type)}
              label="Aurez-vous besoin d’une prise en charge de votre déplacement et d’un hébergement ?"
              helperText="(c’est à titre indicatif pour nous donner une idée des réservations à effectuer. Nous revaliderons avec vous si votre sujet est retenu)"
            >
              <FormControlLabel value="Déplacement + hébergement" control={<Radio required={required} {...register('speaker-expenses', { required: true })} />} label="Une prise en charge de mon déplacement et de mon hébergement" />
              <FormControlLabel value="Déplacement" control={<Radio required={required} {...register('speaker-expenses', { required: true })} />} label="Juste de mon déplacement" />
              <FormControlLabel value="Hébergement" control={<Radio required={required} {...register('speaker-expenses', { required: true })} />} label="Juste de mon hébergement" />
              <FormControlLabel value="Rien" control={<Radio required={required} {...register('speaker-expenses', { required: true })} />} label="Pas besoin, merci" />
            </SimpleRadioField>

            <SimpleRadioField
              id="speaker-coaching"
              error={Boolean(errors?.['speaker-coaching']?.type)}
              label="Souhaitez-vous bénéficier d’un coaching ou d’une aide particulière pour préparer ou finaliser votre conférence ?"
              helperText="(c’est à titre indicatif. Nous affinerons votre demande si votre sujet est retenu)"
            >
              <FormControlLabel value="true" control={<Radio required={required} {...register('speaker-coaching', { required: true })} />} label="Oui je veux bien un accompagnement" />
              <FormControlLabel value="false" control={<Radio required={required} {...register('speaker-coaching', { required: true })} />} label="Pas besoin, merci" />
            </SimpleRadioField>

            <SimpleTextField
              id="speaker-help"
              {...register('speaker-help')}
              error={Boolean(errors?.['speaker-help']?.type)}
              label="Avez-vous besoin d’aide concernant votre venue, votre proposition ou n’importe quel autre aspect de ce Sud Web ? (Facultatif)"
              helperText="(ça ne sera pas publié sur le site)"
              multiline
              minRows={5}
              rows={runtime ? undefined : 5}
            />

            {Boolean(Object.keys(errors).length) && (
              <Alert severity="error" variant="outlined" sx={{ mt: 4 }} icon={false}>
                <AlertTitle>
                  Certaines informations sont indispensables pour pouvoir
                  envoyer cette proposition&nbsp;:
                </AlertTitle>
                <Typography variant="body1">
                  Il manque&nbsp;: {Object.keys(errors).map(error => titles[error]).join(', ')}.
                </Typography>
              </Alert>
            )}

            <input type="hidden" id="redirect" name="redirect" value={withPrefix('/')} />

            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              {step > 0 && (
                <CallToAction
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 4 }}
                  onClick={() => { setStep(1); window?.scrollTo?.(0, 0); }}
                >
                  Revenir en arrière
                </CallToAction>
              )}

              <CallToAction
                disabled={loading}
                variant="contained"
                type="submit"
                sx={{ mt: 4 }}
              >
                Valider et soumettre
              </CallToAction>
            </Box>
          </Box>
        </Box>
      </BorderBox>
    </PageLayout>
  );
};

export default SubjectForm;
