const jwtsecret = require('jsonwebtoken');
require('dotenv').config();

const tokenJwt = {
  tokenCreate: (data) => {
    const token = jwtsecret.sign({ data }, process.env.JWT_SECRET);
    return token;
  },
  // Validando token nas requisições:
  tokenValidate: (token) => {
    if (!token) {
      return { error: { code: 401, message: { message: 'Token not found' } } };
    }
    try {
      const validacao = jwtsecret.verify(token, process.env.JWT_SECRET);
      // return validacao se estiver tudo certo!
      return validacao;
    } catch (error) {
      return { error: { code: 401, message: { message: 'Expired or invalid token' } } };
    }
  },
};

module.exports = tokenJwt;