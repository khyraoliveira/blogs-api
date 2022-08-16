const Joi = require('joi');
const postServices = require('../services/postServices');
const { tokenValidate } = require('../middlewares/jwt');

// chamando as funções
const postControllers = {
  // REQUISITO 12
  validateBody: (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().not().empty(),
    });
    const { error, value } = schema.validate(data);
    if (error) {
      return { error: { code: 400, message: { message: 'Some required fields are missing' } } };
    }
    return value;
  },
  createPost: async (require, response) => {
    const { authorization } = require.headers;
    const validacao = tokenValidate(authorization);
    if (validacao.error) return response.status(validacao.error.code).json(validacao.error.message);
    const userId = validacao.data.id;
     const body = postControllers.validateBody(require.body);
     const { title, content, categoryIds } = body;
    if (body.error) {
      return response.status(body.error.code).json(body.error.message);
    }
    const result = await postServices.createPost(title, content, userId, categoryIds);
    if (result.error) return response.status(result.error.code).json(result.error.message);
    return response.status(201).json(result);
  },
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
  changePost: async (require, response) => {
    const { authorization } = require.headers;
    const validacao = tokenValidate(authorization);
    if (validacao.error) {
      return response.status(validacao.error.code).json(validacao.error.message);
    }
    const { id } = require.params;
    const { title, content } = require.body;
    const chamaFunction = await postServices.changePost(title, content, id);
    if (validacao.data.id !== chamaFunction.id) {
      return response.status(401).json({ message: 'Unauthorized user' });
    }
    if (!title || !content) {
      return response.status(400).json({ message: 'Some required fields are missing' });
    }
    response.status(200).json(chamaFunction);
  },
  // REQUISITO 16
  deletePost: async (require, response) => {
    const { authorization } = require.headers;
    const validacao = tokenValidate(authorization);
    if (validacao.error) {
      return response.status(validacao.error.code).json(validacao.error.message);
    }
    const { id } = require.params;
    const postId = await postServices.findId(id);
    if (postId.error) {
      return response.status(postId.error.code).json(postId.error.message);
    }
    const deletado = await postServices.deletePost(id, validacao.data.id);
    if (deletado.error) {
      // console.log('AQUIIIIII');
      return response.status(deletado.error.code).json(deletado.error.message);
    }
    response.status(204).end();
  },
};

module.exports = postControllers;