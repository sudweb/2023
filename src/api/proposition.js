import { Client } from '@notionhq/client';
import cleanURL from './clean-url';
import sendEmail from './send-email';

const dbId = process.env.DBID_CONF;
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const makeTitle = content => ({ title: [{ text: { content } }] });
const makeText = content => ({ rich_text: [{ text: { content } }] });

const base64Content = data => Buffer.from(Object.values(data).join('\n\n')).toString('base64');

export default async (req, res) => {
  const { body } = req;

  const data = typeof body === 'string' ? JSON.parse(body) : body;
  const parent = { type: 'database_id', database_id: dbId };

  const properties = {
    Titre: makeTitle(data['conf-title']),
    Format: { select: { name: data['conf-format'] } },
    'Donner envie': makeText(data['conf-envy']),
    Description: makeText(data['conf-description']),
    Nom: makeText(data['speaker-name']),
    'E-mail': { email: data['speaker-email'] },
    Où: makeText(data['speaker-location']),
    Défraiement: { select: { name: data['speaker-expenses'] || 'Rien' } },
    Accompagnement: { checkbox: (data['speaker-coaching'] === 'true') },
    'Besoin d\'aide': makeText(data['speaker-help']),
  };

  const emailContent = {
    sender: { name: 'Sud Web 2023', email: 'orateurs@sudweb.fr ' },
    to: [{ name: data['speaker-name'], email: data['speaker-email'] }],
    attachment: [{
      content: base64Content(data),
      name: 'proposition.txt',
    }],
    subject: 'Sud Web 2023 - Merci pour votre proposition',
    htmlContent: `<strong style="font-size: 1.1em">Merci pour votre proposition</strong>
<p>Nous allons étudier attentivement toutes les propositions et nous reviendrons vers vous avec une réponse d’ici mi avril.</p>
<p>Vous avez la possibilité de soumettre plusieurs sujets.</p>
<p>Si votre conférence est retenue, nous vous recontacterons pour organiser la suite.</p>
<p>En espérant vous voir à Sud Web, quelque soit le résultat.</p>`,

    textContent: `Merci pour votre proposition

Nous allons étudier attentivement toutes les propositions et nous reviendrons vers vous avec une réponse d’ici mi avril.

Vous avez la possibilité de soumettre plusieurs sujets.

Si votre conférence est retenue, nous vous recontacterons pour organiser la suite.

En espérant vous voir à Sud Web, quelque soit le résultat.`,
  };

  try {
    const emailResponse = await sendEmail(emailContent);
    console.log('emailResponse', emailResponse); // eslint-disable-line no-console
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }

  let error;
  try {
    const createPaged = await notion.pages.create({ parent, properties });

    if (createPaged) {
      return (data.redirect.toString() === 'false')
        ? res.status(201).json({ created_time: createPaged.created_time })
        : res.redirect(cleanURL(data.redirect, 'merci/'));
    }
  } catch (err) {
    error = err;
  }

  return (data.redirect.toString() === 'false')
    ? res.status(500).json({ error })
    : res.redirect(cleanURL(data.redirect || '/', `erreur/?e=${encodeURIComponent(JSON.stringify(Object.values(data)))}`));
};
