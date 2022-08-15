module.exports = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // para qd for criar o usuário e o retorno da função vir correto (p/ não vir NULL)
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
   updatedAt: 'updated',
   createdAt: 'published',
  })
  blogPost.associate = (model) => {
    blogPost.belongsTo(model.User, { as: 'user', foreignKey: 'userId' })
  }
  return blogPost;
}