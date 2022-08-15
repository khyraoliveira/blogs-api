// rota do express
const { Router } = require('express');
const categoryControllers = require('../controllers/categoryControllers');
// const midfunction = require('../middlewares/validationLogin');

const categoryRouter = Router();

// ROTA DO CATEGORY
categoryRouter.post('/', categoryControllers.newCategory);
categoryRouter.get('/', categoryControllers.allCategory);

module.exports = categoryRouter;