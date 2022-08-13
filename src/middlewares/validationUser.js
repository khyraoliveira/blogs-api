// const db = require('../database/models');
// requisição do model na pastinha database
const Joi = require('joi');

// REQUISITO 4
// Joi: fazer validações.
// Ele pega o corpo da requisição, dentro do 'SCHEMA' dele: ele verifica e valida o corpo da requisição - utilizando os PARÂMETROS do Joi.
const midfunction = {
  joiUser: (body) => {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
      image: Joi.string().required(),
    });

    const { error, value } = schema.validate(body);

    // message: error.details[0] - array cheio de coisas, a posição [0] é onde fica a 'messagem' de erro.
    if (error) return { error: { code: 400, message: { message: error.details[0].message } } };

    return value;
},

  validateUser: async (request, response, next) => {
    try {
      // acessa o que vem do request e faz a validação:
      const validateJoi = midfunction.joiUser(request.body);
      if (validateJoi.error) {
        return response.status(validateJoi.error.code).json(validateJoi.error.message);
      }

      next();
    } catch (e) {
      console.log(e.message);
      response.status(500).json({ message: 'Algo deu errado' }); // erro padrão: 'erro 500'
    }
  },
};

module.exports = midfunction;