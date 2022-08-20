export const removeSpace = (text: string) => {
  return (text = text.split(' ').join('-'));
};

export const removeStrip = (text: string) => {
  return (text = text.split('-').join(' '));
};
