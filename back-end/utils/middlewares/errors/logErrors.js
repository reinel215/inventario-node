const logErrors = (err , req , res, next) => {

    console.error(err.message);
    next(err);

}


module.exports =  logErrors ;