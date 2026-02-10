/**
 * main.js
 */

/* --- existing code --- */
export const getTextWidth = (text, font) => {
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
};

const getFontTextWidthAverage = (font) => {
  const chars =
    '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .,\'()?!"';
  let totalWidth = 0;
  let count = 0;
  for (const char of chars) {
    totalWidth += getTextWidth(char, font);
    count++;
  }
  return Math.floor(totalWidth / count);
};

const getStyle = (element, prop) =>
  window.getComputedStyle(element, null).getPropertyValue(prop);

const getFontDescriptors = (element = document.body) => {
  const fontWeight = getStyle(element, 'font-weight') || 'normal';
  const fontSize = getStyle(element, 'font-size') || '16px';
  const fontFamily = getStyle(element, 'font-family') || 'Times New Roman';
  return `${fontWeight} ${fontSize} ${fontFamily}`;
};

export const computeMaxChar = (percent = 100) => {
  if (percent < 1 || percent > 100) throw new Error('Invalid fill percentage!');
  const textPortrait = document.getElementById('text');
  const fontSize = parseInt(
    getStyle(textPortrait, 'font-size').match(/\d+/)[0]
  );
  const maxLineY = Math.floor((window.innerHeight / fontSize) * (percent / 100));
  const maxCharX = Math.floor(
    window.innerWidth /
      (getFontTextWidthAverage(getFontDescriptors(textPortrait)) - 1)
  );
  return Math.ceil(maxCharX * maxLineY);
};
