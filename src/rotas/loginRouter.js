// rota do express
const { Router } = require('express');
const loginControllers = require('../controllers/loginControllers');
const midfunction = require('../middlewares/validationLogin');

const loginRouter = Router();

// ROTA DO LOGIN
loginRouter.post('/', midfunction.validityEmail, loginControllers.login);

module.exports = loginRouter;