import { Client } from '@notionhq/client';
import { encode } from 'html-entities';

import cleanURL from './clean-url';
import sendEmail from './send-email';

const dbId = process.env.DBID_CONF;
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const makeTitle = content => ({ title: [{ text: { content } }] });
const makeText = content => ({ rich_text: [{ text: { content } }] });

const base64 = str => Buffer.from(str).toString('base64');

const makeRecap = (data, fields = Object.keys(data)) =>
  Object.entries(data)
    .filter(([field]) => fields.includes(field))
    .map(({ 1: value }) => value)
    .join('\n\n');

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

  const recap = makeRecap(
    data,
    ['conf-title', 'conf-format', 'conf-description', 'conf-envy', 'speaker-help'],
  );

  const emailContent = {
    sender: { name: 'Sud Web 2023', email: 'orateurs@sudweb.fr ' },
    to: [{ name: data['speaker-name'], email: data['speaker-email'] }],
    attachment: [{
      content: base64(recap),
      name: 'proposition.txt',
    }],
    subject: 'Sud Web 2023 - Merci pour votre proposition',
    htmlContent: `<p style="font-weight: bold; font-size: 1.1em">Merci pour votre proposition</p>
<p>Nous allons étudier attentivement toutes les propositions courant avril. Si votre conférence est retenue, nous reviendrons vers vous pour organiser la suite.</p>
<p>L’équipe se tient à votre disposition pour toutes questions : <a href="mailto:contact@sudweb.fr">contact@sudweb.fr</a></p>
<p>Vous trouverez ci-dessous le récapitulatif de votre proposition.</p>
<p>En espérant vous voir à Sud Web :)</p>
<hr />
<p>Récapitulatif</p>
<pre>${encode(recap)}</pre>`,

    textContent: `Merci pour votre proposition

Nous allons étudier attentivement toutes les propositions courant avril. Si votre conférence est retenue, nous reviendrons vers vous pour organiser la suite.

L’équipe se tient à votre disposition pour toutes questions : contact@sudweb.fr

Vous trouverez ci-dessous le récapitulatif de votre proposition.

En espérant vous voir à Sud Web :)

----

Récapitulatif :

${recap}`,
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
