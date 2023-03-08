import fetch from 'node-fetch';
import urlJoin from 'url-join';

export const cleanURL = (value, suffix = '') => {
  const prefix = new URL(value, 'https://dummy.tld');
  return urlJoin(prefix.pathname, suffix);
};

export const makeTitle = content => ({ title: [{ text: { content } }] });

export const makeText = content => ({ rich_text: [{ text: { content } }] });

export const makeRecap = (data, fields = Object.keys(data)) => {
  const content = fields.map(field => {
    if (typeof field === 'string') {
      return data[field]?.trim?.();
    }

    const [label, value] = field;
    return [
      label,
      data[value]?.trim?.(),
    ].join('');
  });

  return content.filter(Boolean).join('\n---\n');
};

export const sendEmail = async (params = {}) => {
  const response = await fetch(
    'https://api.sendinblue.com/v3/smtp/email',
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': process.env.SENDINBLUE_TOKEN,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Sud Web', email: 'contact@sudweb.fr' },
        ...params,
      }),
    },
  );

  return response;
};

export default {};
