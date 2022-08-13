// rota do express
const { Router } = require('express');
const userControllers = require('../controllers/userControllers');
const midfunction = require('../middlewares/validationUser');
// const midfunction = require('../middlewares/validation');

const userRouter = Router();

// ROTA DO USER
userRouter.use(midfunction.validateUser);
userRouter.post('/', userControllers.user);

module.exports = userRouter;