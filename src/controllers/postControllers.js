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
  findId: async (require, response) => {
    const { authorization } = require.headers;
    const validacao = tokenValidate(authorization);
    if (validacao.error) {
      return response.status(validacao.error.code).json(validacao.error.message);
    }
    const { id } = require.params;
    const findPeloId = await postServices.findId(id);
    if (findPeloId.error) {
      return response.status(findPeloId.error.code).json(findPeloId.error.message);
    }
    return response.status(200).json(findPeloId);
  },
};

module.exports = postControllers;