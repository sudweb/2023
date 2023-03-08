export const makeRecap = (data, fields = Object.keys(data)) => {
  const content = fields.map(field => {
    if (typeof field === 'string') {
      return data[field];
    }

    const [label, value] = field;
    return [
      label,
      data[value],
    ].join('');
  });

  return content.filter(Boolean).join('\n');
};

export default {};
