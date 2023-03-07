const sendEmail = async (params = {}) => {
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

export default sendEmail;
