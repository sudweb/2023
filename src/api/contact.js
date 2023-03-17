import { Client } from '@notionhq/client';
import { cleanURL, makeText, makeTitle, sendEmail } from '../helpers';

const dbId = process.env.DBID_CONTACT;
const notion = new Client({ auth: process.env.NOTION_TOKEN });

export default async (req, res) => {
  const { body } = req;

  const data = typeof body === 'string' ? JSON.parse(body) : body;
  const parent = { type: 'database_id', database_id: dbId };

  if (data['contact-subject'] || data['contact-company'] === 'google') {
    console.log(`\n\nHoneypot:\n\n${JSON.stringify(data, null, 2)}\n\n`); // eslint-disable-line no-console
    return res.status(200).json({ ok: 'pot de miel' });
  }

  const properties = {
    Nom: makeTitle(data['contact-name']),
    'E-mail': { email: data['contact-email'] },
    Entreprise: makeText(data['contact-company']),
    Message: makeText(data['contact-message']),
  };

  const emailContent = {
    sender: { name: 'Sud Web 2023', email: 'sponsors@sudweb.fr ' },
    to: [{ name: data['contact-name'], email: data['contact-email'] }],
    subject: 'Sud Web 2023 - Merci pour votre message',
    htmlContent: `<p style="font-weight: bold; font-size: 1.1em">Merci pour votre message</p>
<p>Nous allons vous recontacter très rapidement pour discuter des modalités d’un partenariat.</p>`,

    textContent: `Merci pour votre message

Nous allons vous recontacter très rapidement pour discuter des modalités d’un partenariat.`,
  };

  let error;
  let emailResponse;
  let notionResponse;
  let notionUrl;

  try {
    emailResponse = await sendEmail(emailContent);
    console.log('email sent!'); // eslint-disable-line no-console
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    console.log('email response:', emailResponse); // eslint-disable-line no-console
    error = err;
  }

  try {
    notionResponse = await notion.pages.create({ parent, properties });
    notionUrl = notionResponse?.url;
    console.log('Notion item created:', notionUrl); // eslint-disable-line no-console
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    console.log('notion response:', notionResponse); // eslint-disable-line no-console
    error = err;
  }

  if (notionResponse) {
    return (data.redirect === 'false')
      ? res.status(201).json({ created_time: notionResponse.created_time })
      : res.redirect(cleanURL(data.redirect, 'merci-contact/'));
  }

  return (data.redirect === 'false')
    ? res.status(500).json({ error })
    : res.redirect(cleanURL(data.redirect || '/', `erreur/?e=${encodeURIComponent(JSON.stringify(Object.values(data)))}`));
};
