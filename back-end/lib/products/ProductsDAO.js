const postgreLib = require('../postgreLib');



const getAllQuery = "SELECT id, nombre, descripcion, cantidad, precio, image_url FROM PRODUCT;";
const getQuery = "SELECT id, nombre, descripcion, cantidad, precio, image_url FROM PRODUCT WHERE id=$1;";
const insertQuery = "INSERT INTO PRODUCT (nombre, descripcion, cantidad, precio, image_url) VALUES ($1,$2,$3,$4,$5);";
const deleteQuery = "DELETE FROM PRODUCT WHERE id=$1";
const updateQuery = "UPDATE PRODUCT SET nombre=$1, descripcion=$2, cantidad=$3, precio=$4, image_url=$5 WHERE id=$6"


class ProductsDAO {

    constructor() {
        this.client = new postgreLib();
        this.client.connect();
    }




    async getProducts() {

        try {

            const products = await this.client.query(getAllQuery);
            return products;

        } catch (error) {
            console.log("*******ERROR EN 'getProducts' ");
            throw error;
        }

    }


    async getProduct(id) {

        try {

            const product = await this.client.query(getQuery, [id]);
            return product;

        } catch (error) {

            console.log("*******ERROR EN 'getProduct' en ProductsDAO");
            throw error;

        }

    }



    async insertProduct({ nombre, descripcion, cantidad, precio, image_url }) {

        try {

            const result = await this.client.query(insertQuery, [nombre, descripcion, cantidad, precio, image_url]);
            return result;

        } catch (error) {

            console.log("*******ERROR EN 'insertProduct' en ProductsDAO");
            throw error;

        }

    }




    async deleteProduct(id) {

        try {

            const result = await this.client.query(deleteQuery, [id]);
            return result;

        } catch (error) {

            console.log("******ERROR EN 'deleteProduct' en productDAO");
            throw error;
        }

    }


    async updateProduct({ id, nombre, descripcion, cantidad, precio, image_url }) {

        try {

            const result = await this.client.query(updateQuery, [nombre, descripcion, cantidad, precio, image_url, id]);
            return result;

        } catch (error) {

            console.log("******ERROR EN 'updateProduct' en productDAO");
            throw error;
        }


    }

}



module.exports = ProductsDAO;