// const jwtsecret = require('jsonwebtoken');
const Sequelize = require('sequelize');
const model = require('../database/models');
const config = require('../database/config/config');
const db = require('../database/models');
// const jwt = require('../middlewares/jwt');
// requisição do model na pastinha database
require('dotenv').config();

const sequelize = new Sequelize(config.development);

const postServices = {
  // REQUISITO 12
  createPost: async (title, content, userId, categoryIds) => {
  const result = await sequelize.transaction(async (t) => {
    const dadosContent = await db.BlogPost.create({
      title, content, userId,
    }, { transaction: t });

    const idDoBlogPost = dadosContent.dataValues.id;
    const Category = await db.Category.findAll();
    // categoryId é um array. Para verificar se existir o id do categoryId: que ele retorne 'true'.
    // se ele não existir: que ele retorne 'false'.
    const verifyCat = categoryIds.every((id) => Category.some((category) => id === category.id));
    console.log('LOUCURA TOTAL', verifyCat);
    if (!verifyCat || categoryIds.length === 0) {
      return { error: { code: 400, message: { message: '"categoryIds" not found' } } };
    }
    
    await db.PostCategory.bulkCreate( 
      categoryIds.map((ids) => ({ postId: idDoBlogPost, categoryId: ids })),
     { transaction: t },
     );
    return dadosContent;
  });
  return result;
},
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
  // REQUISITO 16
  deletePost: async (id, validacaoId) => {
    const getPost = await postServices.findId(id);
    console.log(validacaoId, getPost.dataValues.userId);
    if (Number(validacaoId) !== Number(getPost.dataValues.userId)) {
      return { error: { code: 401, message: { message: 'Unauthorized user' } } };
    }
    const destroiPost = await model.BlogPost.destroy({ where: { id } });
    return destroiPost;
  },
};

module.exports = postServices;