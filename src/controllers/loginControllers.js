const loginServices = require('../services/loginServices');

// chamando as funções
const loginControllers = {
  login: async (require, response) => {
    const { email, password } = require.body;
    const token = await loginServices.login(email, password);
    // verificação se houver erro na função de login
    if (token.error) {
      return response.status(400).json({ message: 'Invalid fields' });
    }
    // console.log('ME ACHE', token);
    return response.status(200).json({ token });
  },
};

module.exports = loginControllers;