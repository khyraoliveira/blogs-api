module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // para qd for criar o usuário e o retorno da função vir correto (p/ não vir NULL)
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  })
  user.associate = (model) => {
    user.hasMany(model.BlogPost, { as: 'blogPost', foreignKey: 'userId' })
  }
  return user;
}