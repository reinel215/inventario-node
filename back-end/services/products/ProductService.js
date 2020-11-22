"use strict";

const ProductsDAO = require('../../lib/products/ProductsDAO');


class ProductService {


    constructor(){

        this.productsDAO = new ProductsDAO(); 

    }


    getProduct() {

    }


    async getProducts() {

        const result = await this.productsDAO.prueba();
        return result;

    } 


    insertProduct() {


    }


    deleteProduct(){

    }


}



module.exports = ProductService;