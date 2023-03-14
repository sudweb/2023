/* eslint-disable no-irregular-whitespace */
import { Client } from '@notionhq/client';
import { encode } from 'html-entities';

import {
  cleanURL,
  makeRecap,
  makeSelect,
  makeText,
  makeTitle,
  sendEmail,
} from '../helpers';

const dbId = process.env.DBID_CONF;
const notion = new Client({ auth: process.env.NOTION_TOKEN });

const EXPENSES_VALUES = [
  'Déplacement + hébergement',
  'Déplacement',
  'Hébergement',
  'Rien',
];

const FORMAT_VALUES = [
  '20 minutes',
  '5 minutes',
];

export default async (req, res) => {
  const { body } = req;

  const data = typeof body === 'string' ? JSON.parse(body) : body;
  const parent = { type: 'database_id', database_id: dbId };

  const properties = {
    Titre: makeTitle(data['conf-title']),
    Format: makeSelect(data['conf-format'], FORMAT_VALUES),
    'Donner envie': makeText(data['conf-envy']),
    Description: makeText(data['conf-description']),
    Nom: makeText(data['speaker-name']),
    'E-mail': { email: data['speaker-email'] },
    Où: makeText(data['speaker-location']),
    Défraiement: makeSelect(data['speaker-expenses'], EXPENSES_VALUES),
    Accompagnement: { checkbox: (data['speaker-coaching'] === 'true') },
    'Besoin d\'aide': makeText(data['speaker-help']),
  };

  const recap = makeRecap(
    data,
    [
      ['Titre de votre conférence :\n', 'conf-title'],
      ['Durée : ', 'conf-format'],
      ['Pour donner envie (non rendu public) :\n', 'conf-envy'],
      ['Description :\n', 'conf-description'],
      ['Demande d\'aide (non rendu public) :\n', 'speaker-help'],
      ['Demande de prise en charge : ', 'speaker-expenses'],
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
<p>L’équipe se tient à votre disposition pour toutes questions : <a href="mailto:orateurs@sudweb.fr">orateurs@sudweb.fr</a></p>
<p>Vous trouverez ci-dessous le récapitulatif de votre proposition.</p>
<p>En espérant vous voir à Sud Web :)</p>
<hr />
<p style="font-weight: bold;">Récapitulatif</p>
<blockquote type="cite" style="white-space: pre-wrap;">${encode(recap)}</blockquote>`,

    textContent: `Merci pour votre proposition

Nous allons étudier attentivement toutes les propositions courant avril. Si votre conférence est retenue, nous reviendrons vers vous pour organiser la suite.

L’équipe se tient à votre disposition pour toutes questions : orateurs@sudweb.fr

Vous trouverez ci-dessous le récapitulatif de votre proposition.

En espérant vous voir à Sud Web :)

----

Récapitulatif :

${recap}`,
  };

  let emailResponse;
  try {
    emailResponse = await sendEmail(emailContent);
    console.log('email sent!'); // eslint-disable-line no-console
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    console.log('email response:', emailResponse); // eslint-disable-line no-console
  }

  let error;
  let notionResponse;
  let notionUrl;

  try {
    notionResponse = await notion.pages.create({ parent, properties });
    notionUrl = notionResponse?.url;
    console.log('Notion item created:', notionUrl); // eslint-disable-line no-console
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    console.log('notion response:', notionResponse); // eslint-disable-line no-console
    error = err;
  }

  if (process.env.SLACK_WEBHOOK) {
    const text = [
      `📢 *<mailto:${data['speaker-email']}|${data['speaker-name']}>* vient de proposer le sujet :`,
      `> - *Titre* : ${data['conf-title']}`,
      `> - *Lien* : ${notionUrl}`,
    ];

    let slackResponse;

    try {
      slackResponse = await fetch(
        process.env.SLACK_WEBHOOK,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: text.join('\n') }),
        },
      );
      console.log('Slack hook called.'); // eslint-disable-line no-console
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
      console.log('slack response:', slackResponse); // eslint-disable-line no-console
    }
  } else {
    console.log('No SLACK_WEBHOOK defined.'); // eslint-disable-line no-console
  }

  if (notionResponse) {
    return (data.redirect.toString() === 'false')
      ? res.status(201).json({ created_time: notionResponse.created_time })
      : res.redirect(cleanURL(data.redirect, 'merci/'));
  }

  return (data.redirect.toString() === 'false')
    ? res.status(500).json({ error })
    : res.redirect(cleanURL(data.redirect || '/', `erreur/?e=${encodeURIComponent(JSON.stringify(Object.values(data)))}`));
};
