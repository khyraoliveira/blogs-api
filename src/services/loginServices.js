// const jwtsecret = require('jsonwebtoken');
const model = require('../database/models');
const jwt = require('../middlewares/jwt');
// requisição do model na pastinha database
require('dotenv').config();

const loginServices = {
  login: async (email, password) => {
    const user = await (model.User.findOne({
      // vai na tabela procurar o que está sendo requisitado:
      // trará tudo que está dentro de User c/ o email referido (sem displayName ou image).
      attributes: { exclude: ['displayName', 'image'] },
      where: { email },
    }));
    // console.log('ESTOU AQUI', user);
    if (!user || user.password !== password) {
      const erros = {
        error: {
          status: 400,
          message: 'Invalid fields',
        },
      };
      return erros;
    }
    // Course - seção gabaritos:
    const { password: removedPassword, ...userWithoutPassword } = user.dataValues;
    const token = jwt.tokenCreate(userWithoutPassword);
    // console.log('EU TO AQUI', token);
    return token;
  },
};

module.exports = loginServices;