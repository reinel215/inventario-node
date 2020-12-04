const { Pool } = require('pg');
const { config } = require('../config/config');



class postgreLib {


    connect() {
        if (!postgreLib.clientPool) {

            postgreLib.clientPool = new Pool({
                user : config.dbUser,
                host : config.dbHost,
                database : config.dbName,
                password : config.dbPassword,
                port : config.dbPort
            });

        }

        return postgreLib.clientPool
    }


    async query(query, values = []) {

        if(postgreLib.clientPool){

            try {
            
                const result = await postgreLib.clientPool.query(query,values);
                return result.rows;

            } catch (error_) {
                const error = this.handlerError(error_);
                console.log("******ERROR DURANTE EL QUERY");
                console.log(query);
                throw error;   
            }
        }

    }




    disconnect(){
        if (postgreLib.clientPool){

            postgreLib.clientPool.end();

        }
    }





    handlerError (error){

        switch (error.code) {
            case '23505':
                return new Error('Error campo debe ser unico');
        }


    }




}



module.exports = postgreLib;