const { JWT_KEY, NODE_ENV, PORT } = process.env;
const IS_PRODUCTION = NODE_ENV === "production";

export {
  JWT_KEY,
  IS_PRODUCTION,
  NODE_ENV,
  PORT
};