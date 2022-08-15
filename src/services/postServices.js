// const jwtsecret = require('jsonwebtoken');
const model = require('../database/models');
// const jwt = require('../middlewares/jwt');
// requisição do model na pastinha database
require('dotenv').config();

const postServices = {
  getPost: async () => {
    const allPost = await model.BlogPost.findAll({
      include: [{
        model: model.User, as: 'user', attributes: { exclude: ['password'] },
      },
      {
        model: model.Category, as: 'categories', through: { attributes: [] },
      }],
    });
    return allPost;
  },
};

module.exports = postServices;