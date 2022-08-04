const db = require('../database/models');
// requisição do model na pastinha database

// REQUISITO 3
const midfunction = {
  validityEmail: async (require, response, next) => {
    const { email, password } = require.body;
    if (!email || password === undefined) {
      return response.status(400).json({ message: 'Some required fields are missing' });
    }
    console.log(email, password);
    try {
      const resultUser = await db.User.findOne({ where: { email, password } });
      // console.log('to aqui', resultUser);
      if (!resultUser) return response.status(400).json({ message: 'Invalid fields' });
  
      next();
    } catch (e) {
      console.log(e.message);
      response.status(500).json({ message: 'Algo deu errado' }); // erro padrão: 'erro 500'
    }
    // validityBody: async (require, response, next) =>
} };

module.exports = midfunction;