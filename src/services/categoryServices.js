const model = require('../database/models');
// requisição do model na pastinha database/model
// const jwt = require('../middlewares/jwt');
require('dotenv').config();

const categoryServices = {
  newCategory: async (name) => {
    const createCategory = await (model.Category.create({ name,
    }));
    // create: função para criar uma nova categoria, onde vem só o 'name', conforme
    return createCategory;
  },
};

module.exports = categoryServices;