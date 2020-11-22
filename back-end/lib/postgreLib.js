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

            } catch (error) {
                console.log("******ERROR DURANTE EL QUERY");
                throw error;   
            }
        }

    }




    disconnect(){
        if (postgreLib.clientPool){

            postgreLib.clientPool.end();

        }
    }





}



module.exports = postgreLib;