const jwtsecret = require('jsonwebtoken');
require('dotenv').config();

const tokenJwt = {
  tokenCreate: (data) => {
    const token = jwtsecret.sign({ data }, process.env.JWT_SECRET);
    return token;
  },
};

module.exports = tokenJwt;