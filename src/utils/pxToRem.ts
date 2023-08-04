export const pxToRem = (size: number, fontSize = 15) =>
  `${size / parseInt(fontSize.toString())}rem`;
