const express = require('express');
const loginRouter = require('./rotas/loginRouter');
const userRouter = require('./rotas/userRouter');
// require('express-async-errors');

// ...

const app = express();

app.use(express.json());

// configuração de rotas
app.use('/login', loginRouter);
app.use('/user', userRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
