const postgreLib = require('../postgreLib');




class ProductsDAO {

    constructor(){
        this.client = new postgreLib();
        this.client.connect();
    }




    async prueba(){

        const result = await this.client.query("SELECT * FROM PRODUCT");
        return result;

    }






}



module.exports = ProductsDAO;