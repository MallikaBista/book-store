import Commerce from '@chec/commerce.js';

console.log("Commerce Key:", process.env.REACT_APP_CHEC_PUBLIC_KEY);

export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true);
