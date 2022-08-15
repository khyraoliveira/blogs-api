const postServices = require('../services/postServices');
const { tokenValidate } = require('../middlewares/jwt');

// chamando as funções
const postControllers = {
  listAll: async (require, response) => {
    const { authorization } = require.headers;
    const validacao = tokenValidate(authorization);
    if (validacao.error) {
      return response.status(validacao.error.code).json(validacao.error.message);
    }
    const createPost = await postServices.getPost();
    return response.status(200).json(createPost);
  },
};

module.exports = postControllers;