"use strict";

const ProductsDAO = require('../../lib/products/ProductsDAO');


class ProductService {


    constructor(){

        this.productsDAO = new ProductsDAO(); 

    }


    async getProduct(id) {

        const product = await this.productsDAO.getProduct(id);
        return product;

    }


    async getProducts() {

        const products = await this.productsDAO.getProducts();
        return products;

    } 


    async insertProduct(product) {

        const result = await this.productsDAO.insertProduct(product);
        return result;

    }


    async deleteProduct(id){

        const result = await this.productsDAO.deleteProduct(id);
        return result;

    }


    async updateProduct(product){

        const result = await this.productsDAO.updateProduct(product);
        return result;

    }


    async getProductWithName(name){

        const result = await this.productsDAO.getProductWithName(name);
        return result;

    }


}



module.exports = ProductService;