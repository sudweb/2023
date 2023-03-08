import { Client } from '@notionhq/client';
import { encode } from 'html-entities';

import cleanURL from './clean-url';
import { makeRecap } from './helpers';
import sendEmail from './send-email';

const dbId = process.env.DBID_CONF;
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const makeTitle = content => ({ title: [{ text: { content } }] });
const makeText = content => ({ rich_text: [{ text: { content } }] });

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
    [
      ['Titre de votre conférence :\n', 'conf-title'],
      ['Durée : ', 'conf-format'],
      ['Description :\n', 'conf-description'],
      ['Pour donner envie (non rendu public) :\n', 'conf-envy'],
      ['Demande d\'aide (non rendu public) :\n', 'speaker-help'],
    ],
  );

  const emailContent = {
    sender: { name: 'Sud Web 2023', email: 'orateurs@sudweb.fr ' },
    to: [{ name: data['speaker-name'], email: data['speaker-email'] }],
    // attachment: [{
    //   content: Buffer.from(recap).toString('base64');,
    //   name: 'recapitulatif.txt',
    // }],
    subject: 'Sud Web 2023 - Merci pour votre proposition',
    htmlContent: `<p style="font-weight: bold; font-size: 1.1em">Merci pour votre proposition</p>
<p>Nous allons étudier attentivement toutes les propositions courant avril. Si votre conférence est retenue, nous reviendrons vers vous pour organiser la suite.</p>
<p>L’équipe se tient à votre disposition pour toutes questions : <a href="mailto:contact@sudweb.fr">contact@sudweb.fr</a></p>
<p>Vous trouverez ci-dessous le récapitulatif de votre proposition.</p>
<p>En espérant vous voir à Sud Web :)</p>
<hr />
<p style="font-weight: bold;">Récapitulatif</p>
<blockquote type="cite">${encode(recap)}</blockquote>`,

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
