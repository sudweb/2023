import { Client } from '@notionhq/client';

const dbId = process.env.DBID_CONTACT;
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const makeTitle = content => ({ title: [{ text: { content } }] });
const makeText = content => ({ rich_text: [{ text: { content } }] });

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

  let error;
  try {
    const createPaged = await notion.pages.create({ parent, properties });

    if (createPaged) {
      return (data.redirect === 'false')
        ? res.status(201).json({ created_time: createPaged.created_time })
        : res.redirect(`${data.redirect || '/'}merci-contact/`);
    }
  } catch (err) {
    error = err;
  }

  return (data.redirect === 'false')
    ? res.status(500).json({ error })
    : res.redirect(`${data.redirect || '/'}erreur/?e=${encodeURIComponent(JSON.stringify(Object.values(data)))}`);
};
