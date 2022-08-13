const userServices = require('../services/userServices');
const loginServices = require('../services/loginServices');

const userControllers = {
  user: async (require, response) => {
    const { displayName, email, password, image } = require.body;
    const resultUser = await userServices.createUser(displayName, email, password, image);
    // createUser acima, que vem do body, jogar no banco de dados
    // email e password já estão na requisição, aproveita e passa eles pro token
    // daí como o token é criado no 'loginServices', chama aqui
    console.log(resultUser);
    if (resultUser.emailE) {
      return response.status(resultUser.emailE.code).json(resultUser.emailE.message);
    }
    const token = await loginServices.login(email, password);
    return response.status(201).json({ token });
  },
};

module.exports = userControllers;