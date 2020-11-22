'use strict';

const errorHandler = (err, req , res , next) => {

    //voy a verificar las cabezeras

    if(res.headersSent){
        return next(err);
    }


    let status;

    err.message == 'page not found' ? status = 404 : status = 500;

    switch (err.message) {
        case 'page not foung':
            status = 404;
            break;


        case 'debe iniciar sesion primero':
            status = 401;
            break
            

        case 'duplicate key value violates unique constraint "product_nombre_key"':
            status = 500
            err.message = 'ese nombre ya se encuentra en uso'
            break;
        default:
            status = 500;
            break;
    }


    res.status(status).json(
        {
            error : err.message
        }
    );




}


module.exports = errorHandler;