
require('dotenv').config()

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const CLIENT_KEY = process.env.REACT_APP_CLIENT_KEY
const SECRET = process.env.REACT_APP_SECRET
const DATABASE = process.env.REACT_APP_CLIENT_DATABASE

const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONDODB_URI,

  },
  default: {
    SECRET: SECRET,
    DATABASE: "mongodb://localhost:27017/bookshelf",
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
