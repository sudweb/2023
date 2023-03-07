import urlJoin from 'url-join';

const cleanURL = (value, suffix = '') => {
  const prefix = new URL(value, 'https://dummy.tld');
  return urlJoin(prefix.pathname, suffix);
};

export default cleanURL;
