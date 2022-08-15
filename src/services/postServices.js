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
  findId: async (id) => {
    const achaId = await model.BlogPost.findByPk(id, 
      {
        include: [{
          model: model.User, as: 'user', attributes: { exclude: ['password'] },
        },
        {
          model: model.Category, as: 'categories', through: { attributes: [] },
        }],
      }); // pk: primary key.
    if (!achaId) return { error: { code: 404, message: { message: 'Post does not exist' } } };
    return achaId;
  },
  changePost: async (title, content, id) => {
    await model.BlogPost.update({ title, content }, { where: { id } });
    const achaId = await model.BlogPost.findByPk(id, 
      {
        include: [{
          model: model.User, as: 'user', attributes: { exclude: ['password'] },
        },
        {
          model: model.Category, as: 'categories', through: { attributes: [] },
        }],
      });
      return achaId;
  },
};

module.exports = postServices;