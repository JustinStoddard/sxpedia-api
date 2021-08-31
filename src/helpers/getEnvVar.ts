
export const getEnvVar = (key: string) => {
  let value;
  try {
    value = process.env[key];
  } catch (err) {
    console.log(`Couldn't Fetch ${key} >>> ${err}`);
  }
  return value;
};