// rota do express
const { Router } = require('express');
const postControllers = require('../controllers/postControllers');
// const midfunction = require('../middlewares/validationLogin');

const postRouter = Router();

// ROTA DO POST
postRouter.get('/:id', postControllers.findId);
postRouter.get('/', postControllers.listAll);
postRouter.put('/:id', postControllers.changePost);

module.exports = postRouter;