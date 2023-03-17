import React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { navigate, withPrefix } from 'gatsby';

import PageLayout from '../components/PageLayout';
import BorderBox from '../components/BorderBox';
import SimpleTextField from '../components/SimpleTextField';
import CallToAction from '../components/CallToAction';
import Title from '../components/Title';

const required = true;

const titles = {
  'contact-name': 'vos prénom et nom',
  'contact-email': 'votre adresse email',
  'contact-company': 'votre entreprise',
  'contact-message': 'votre message',
};

export const Head = () => <Title value="Devenez sponsor" />;

const ContactForm = props => {
  const { register, handleSubmit, formState: { errors } } = useForm();
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
      withPrefix('/api/contact'),
      {
        method: 'POST',
        'content-type': 'application/json',
        body: JSON.stringify({
          ...data,
          redirect: 'false',
          mode: 'sponsor',
        }),
      },
    );
    if (response.status === 201) {
      navigate('/merci-contact');
    } else {
      navigate('/erreur');
    }
  };

  return (
    <PageLayout title="Devenez sponsor" {...props}>
      <BorderBox variant="simple">
        <Typography variant="h1" gutterBottom>
          Devenez sponsor
        </Typography>

        <Box
          component="form"
          action={withPrefix('/api/contact')}
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="body1" paragraph sx={{ fontWeight: 500 }}>
            Vous souhaitez soutenir Sud Web pour sa prochaine édition&nbsp;?
            Contactez-nous et nous verrons ensemble comment nous pourrons
            établir un partenariat.
          </Typography>

          <SimpleTextField
            id="contact-name"
            {...register('contact-name', { required: true })}
            error={Boolean(errors?.['contact-name']?.type)}
            label="Vos prénom et nom"
            required={required}
          />

          <SimpleTextField
            id="contact-email"
            {...register('contact-email', { required: true })}
            error={Boolean(errors?.['contact-email']?.type)}
            label="Votre adresse email"
            type="email"
            required={required}
          />

          <SimpleTextField
            id="contact-company"
            {...register('contact-company')}
            error={Boolean(errors?.['contact-company']?.type)}
            label="Votre entreprise"
          />

          <Box sx={{ position: 'absolute', height: 0, overflow: 'hidden' }}>
            <SimpleTextField
              id="contact-subject"
              {...register('contact-subject')}
              label="Merci de ne rien saisir ici"
              inputProps={{ tabIndex: '-1' }}
            />
          </Box>

          <SimpleTextField
            id="contact-message"
            {...register('contact-message', { required: true })}
            error={Boolean(errors?.['contact-message']?.type)}
            label="Votre message à notre intention"
            multiline
            minRows={5}
            rows={runtime ? undefined : 5}
            required={required}
          />

          {Boolean(Object.keys(errors).length) && (
            <Alert severity="error" variant="outlined" sx={{ mt: 4 }} icon={false}>
              <AlertTitle>
                Certaines informations sont indispensables pour pouvoir
                envoyer votre message&nbsp;:
              </AlertTitle>
              <Typography variant="body1">
                Il manque&nbsp;: {Object.keys(errors).map(error => titles[error]).join(', ')}.
              </Typography>
            </Alert>
          )}

          <input type="hidden" id="redirect" name="redirect" value={withPrefix('/')} />
          <input type="hidden" id="mode" name="mode" value="sponsor" />

          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <CallToAction
              disabled={loading}
              variant="contained"
              type="submit"
              sx={{ mt: 4 }}
            >
              Envoyer votre message
            </CallToAction>
          </Box>
        </Box>
      </BorderBox>
    </PageLayout>
  );
};

export default ContactForm;
