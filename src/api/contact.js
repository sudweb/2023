import { Client } from '@notionhq/client';
import { cleanURL, makeText, makeTitle, sendEmail } from '../helpers';

const dbId = process.env.DBID_CONTACT;
const notion = new Client({ auth: process.env.NOTION_TOKEN });

export default async (req, res) => {
  const { body } = req;

  const data = typeof body === 'string' ? JSON.parse(body) : body;
  const parent = { type: 'database_id', database_id: dbId };

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

  try {
    const emailResponse = await sendEmail(emailContent);
    console.log(emailResponse); // eslint-disable-line no-console
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }

  let error;
  try {
    const createPaged = await notion.pages.create({ parent, properties });

    if (createPaged) {
      return (data.redirect === 'false')
        ? res.status(201).json({ created_time: createPaged.created_time })
        : res.redirect(cleanURL(data.redirect, 'merci-contact/'));
    }
  } catch (err) {
    error = err;
  }

  return (data.redirect === 'false')
    ? res.status(500).json({ error })
    : res.redirect(cleanURL(data.redirect || '/', `erreur/?e=${encodeURIComponent(JSON.stringify(Object.values(data)))}`));
};
