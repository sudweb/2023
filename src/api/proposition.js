import { Client } from '@notionhq/client';

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

  let error;
  try {
    const createPaged = await notion.pages.create({ parent, properties });

    if (createPaged) {
      return (data.redirect === false)
        ? res.status(201).json({ created_time: createPaged.created_time })
        : res.redirect(`${data.redirect}merci/`);
    }
  } catch (err) {
    error = err;
  }

  return (data.redirect === 'false')
    ? res.status(500).json({ error })
    : res.redirect(`${data.redirect}erreur/?${encodeURIComponent(JSON.stringify(Object.values(data)))}`);
};
