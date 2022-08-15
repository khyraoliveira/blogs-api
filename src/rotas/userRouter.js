// rota do express
const { Router } = require('express');
const userControllers = require('../controllers/userControllers');
const midfunction = require('../middlewares/validationUser');
// const midfunction = require('../middlewares/validation');

const userRouter = Router();

// ROTA DO USER
// userRouter.use(midfunction.validateUser);
userRouter.post('/', midfunction.validateUser, userControllers.user);
userRouter.get('/', userControllers.findAll);
userRouter.get('/:id', userControllers.findId);

module.exports = userRouter;