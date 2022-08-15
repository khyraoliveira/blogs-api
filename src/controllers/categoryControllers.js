const { tokenValidate } = require('../middlewares/jwt');
const categoryServices = require('../services/categoryServices');

const categoryControllers = {
  newCategory: async (require, response) => {
    const { authorization } = require.headers;
    const validacao = tokenValidate(authorization);
    if (validacao.error) {
      return response.status(validacao.error.code).json(validacao.error.message);
    }
    const { name } = require.body;
    if (!name) {
      return response.status(400).json({ message: '"name" is required' });
    }
    const createCategory = await categoryServices.newCategory(name);
    return response.status(201).json(createCategory);
  },
  allCategory: async (require, response) => {
    const { authorization } = require.headers;
    const validacao = tokenValidate(authorization);
    if (validacao.error) {
      return response.status(validacao.error.code).json(validacao.error.message);
    }
    const showAllCategory = await categoryServices.findAllCategory();
    return response.status(200).json(showAllCategory);
  },
};

module.exports = categoryControllers;
