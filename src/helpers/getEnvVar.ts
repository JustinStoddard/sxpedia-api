/**
 * Function that will grab a value from process.env based on a key
 * @param key Key of the value you want to grab
 * @returns The value from process.env
 */
export const getEnvVar = (key: string) => {
  let value;
  try {
    value = process.env[key];
  } catch (err) {
    console.log(`Couldn't Fetch ${key} >>> ${err}`);
  }
  return value;
};