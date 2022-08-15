module.exports = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true
   },
  categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true
  },
  },
 )
 postCategory.associate = (model) => {
  model.BlogPost.belongsToMany(model.Category, {
      as: 'categories',
      through: postCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId'
  });
  model.Category.belongsToMany(model.BlogPost, {
      as: 'blogPost',
      through: postCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId'
  });
}
  return postCategory;
}