const express = require('express');
const routerApi = require('./routes');
const { config } = require('./config/config')
const { logErrors, errorHandler, ormErrorHandler,  boomErrorHandler} = require('./middlewares/error.handler');

const port = config.port;
const app = express();

app.use(express.json());

require('./libs/auth');

routerApi(app);

//Es muy importante la jerarquia de los midlewares de error
app.use(logErrors); //nivel 1
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler); //nivel 2

app.listen(port,()=>{
    console.log('Running App in port' +  port);
})