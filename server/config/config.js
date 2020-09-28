
require('dotenv').config()

const SECRET = process.env.REACT_APP_SECRET

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
