const userServices = require('../services/userServices');
const loginServices = require('../services/loginServices');
const { tokenValidate } = require('../middlewares/jwt');

const userControllers = {
  user: async (require, response) => {
    const { displayName, email, password, image } = require.body;
    const resultUser = await userServices.createUser(displayName, email, password, image);
    // createUser acima, que vem do body, jogar no banco de dados
    // email e password já estão na requisição, aproveita e passa eles pro token
    // daí como o token é criado no 'loginServices', chama aqui
    // console.log(resultUser);
    if (resultUser.emailE) {
      return response.status(resultUser.emailE.code).json(resultUser.emailE.message);
    }
    const token = await loginServices.login(email, password);
    return response.status(201).json({ token });
  },
  findAll: async (require, response) => {
    const { authorization } = require.headers;
    const validacao = tokenValidate(authorization);
    if (validacao.error) {
      return response.status(validacao.error.code).json(validacao.error.message);
    }
    console.log(validacao);
    const allUsers = await userServices.findAllUser();

    return response.status(200).json(allUsers);
  },
  findId: async (require, response) => {
    const { authorization } = require.headers;
    const validacao = tokenValidate(authorization);
    if (validacao.error) {
      return response.status(validacao.error.code).json(validacao.error.message);
    }
    const { id } = require.params;
    const findPeloId = await userServices.findId(id);
    if (findPeloId.error) {
      return response.status(findPeloId.error.code).json(findPeloId.error.message);
    }
    return response.status(200).json(findPeloId);
  },
};

module.exports = userControllers;