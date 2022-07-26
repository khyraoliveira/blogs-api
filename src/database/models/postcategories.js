'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  postCategories.init({
    postId: DataTypes.STRING,
    categoryId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'postCategories',
  });
  return postCategories;
};