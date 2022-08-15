const model = require('../database/models');
// requisição do model na pastinha database/model
const jwt = require('../middlewares/jwt');
require('dotenv').config();

const userServices = {
  createUser: async (displayName, email, password, image) => {
    const emailE = await (model.User.findOne({
      // vai na tabela procurar o que está sendo requisitado:
      // trará tudo que está dentro de User c/ o email referido já 'E'xiste no body.
      where: { email },
    }));
    // console.log('MERMAO EU TO AQUI', !!emailE);
    if (emailE) return { emailE: { code: 409, message: { message: 'User already registered' } } };
    // console.log('TESTANDO');
    const user = await model.User.create({ displayName, email, password, image });
  
  const token = jwt.tokenCreate(user);
  return token;
  },
  findAllUser: async () => {
    const allUser = await model.User.findAll({ attributes: { exclude: ['password'] } });
    return allUser;
  },
  findId: async (id) => {
    const achaId = await model.User.findByPk(id, { attributes: { exclude: ['password'] } }); // pk: primary key.
    if (!achaId) return { error: { code: 404, message: { message: 'User does not exist' } } };
    return achaId;
  },
};

module.exports = userServices;