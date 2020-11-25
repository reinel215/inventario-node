const postgreLib = require('../postgreLib');



const getAllQuery = "SELECT id, nombre, descripcion, cantidad, precio, image_url FROM PRODUCT ORDER BY id;";
const getQuery = "SELECT id, nombre, descripcion, cantidad, precio, image_url FROM PRODUCT WHERE id=$1;";
const insertQuery = "INSERT INTO PRODUCT (nombre, descripcion, cantidad, precio, image_url) VALUES ($1,$2,$3,$4,$5);";
const deleteQuery = "DELETE FROM PRODUCT WHERE id=$1";
const updateQuery = "UPDATE PRODUCT SET nombre=$1, descripcion=$2, cantidad=$3, precio=$4, image_url=$5 WHERE id=$6"
const getProductWithName = "SELECT id,nombre,descripcion,cantidad,precio FROM PRODUCT WHERE nombre=$1;";

class ProductsDAO {

    constructor() {
        this.client = new postgreLib();
        this.client.connect();
    }




    async getProducts() {

        try {

            const products = await this.client.query(getAllQuery);
            return products;

        }  catch (error_) {
            const error = this.handleError(error_);
            console.log("******ERROR EN 'getProducts' en productDAO");
            throw error;

        }

    }


    async getProduct(id) {

        try {

            const product = await this.client.query(getQuery, [id]);
            return product;

        }  catch (error_) {

            const error = this.handleError(error_);
            console.log("******ERROR EN 'getProduct' en productDAO");
            throw error;

        }

    }



    async insertProduct({ nombre, descripcion, cantidad, precio, image_url }) {

        try {

            const result = await this.client.query(insertQuery, [nombre, descripcion, cantidad, precio, image_url]);
            return result;

        } catch (error_) {
            const error = this.handleError(error_);
            console.log("******ERROR EN 'insertProduct' en productDAO");
            throw error;

        }

    }




    async deleteProduct(id) {

        try {

            const result = await this.client.query(deleteQuery, [id]);
            return result;

        } catch (error_) {
            const error = this.handleError(error_);
            console.log("******ERROR EN 'deleteProduct' en productDAO");
            throw error;

        }

    }


    async updateProduct({ id, nombre, descripcion, cantidad, precio, image_url }) {

        try {

            const result = await this.client.query(updateQuery, [nombre, descripcion, cantidad, precio, image_url, id]);
            return result;

        } catch (error_) {
            const error = this.handleError(error_);
            console.log("******ERROR EN 'updateProduct' en productDAO");
            throw error;

        }


    }




    async getProductWithName(name) {

        try {

            const result = await this.client.query(getProductWithName, [name]);
            return result;

        } catch (error_) {
            const error = this.handleError(error_);
            console.log("******ERROR EN 'getProductWithName' en productDAO");
            throw error;

        }

    }


    handleError(error) {

        switch (error.message) {
            case 'Error campo debe ser unico':
                return new Error("el nombre del producto debe ser unico");
                break;
        }

    }

}



module.exports = ProductsDAO;