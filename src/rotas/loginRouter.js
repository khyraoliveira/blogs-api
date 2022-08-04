// rota do express
const { Router } = require('express');
const loginControllers = require('../controllers/loginControllers');
const midfunction = require('../middlewares/validation');

const loginRouter = Router();

// ROTA DO LOGIN
loginRouter.post('/', midfunction.validityEmail, loginControllers.login);

module.exports = loginRouter;