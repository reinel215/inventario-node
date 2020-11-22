'use strict';

const express = require('express');
const app = express();



const { config } = require('./config/config');



//LOGGER
const morgan = require('morgan');

if (config.dev) {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}









//BODY PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.json()) //parse aplicattion json
app.use(bodyParser.urlencoded({ extended: false }))





//CORS
const cors = require('cors');
app.use(cors()); //activa el cors para todas las rutas


//PROTECCION DE CABEZERAS
const helmet = require('helmet');
app.use(helmet());


//CARPETA PUBLICA
const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));



//COMPRESION DE CONSULTAS
const compression = require('compression');
app.use(compression());




//RUTAS
const productApi = require('./routes/products/productApi'); //rutas de los productos
productApi(app);



//Errores
//page not found
const notFound = require('./utils/middlewares/errors/notFound');
app.use(notFound);
//log errores
const logErrors = require('./utils/middlewares/errors/logErrors');
app.use(logErrors);
//error handler 
const errorHandler = require('./utils/middlewares/errors/errorHandler');
app.use(errorHandler);





//desplegamos el servidor
app.listen(config.port, () => {

    console.log(`server is running a server on port: http://localhost:${config.port}`);

});