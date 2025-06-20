/**
 * @function - Random Token Generator
 * @param {number} length - number of characters
 * @return {string}
 */
export const randomToken = () => {
  let token = '';
  for (let i = 0; i < 6; i++) {
    token += Math.floor(Math.random() * 10);
  }
  return token;
};

/**
 * @function - Random Code Generator
 * @param {number} length - number of characters
 * @return {string}
 */
export const codeGenerator = (length = 6) => {
  const characters = 'ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += characters[Math.floor(Math.random() * characters.length)];
  }
  return code;
};

export const nanoCharacters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
