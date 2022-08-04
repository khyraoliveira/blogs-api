// rota do express
const { Router } = require('express');
const midfunction = require('../middlewares/validation');

const loginRouter = Router();

// ROTA DO LOGIN
loginRouter.post('/', midfunction.validityEmail);

module.exports = loginRouter;