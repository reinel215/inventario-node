"use strict";

const ProductsDAO = require('../../lib/products/ProductsDAO');
const FileLib = require('../../lib/FileLib');
const path = require('path');


class ProductService {


    constructor() {

        this.productsDAO = new ProductsDAO();
        this.fileLib = new FileLib();

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


    async deleteProduct(id) {

        const result = await this.productsDAO.deleteProduct(id);
        return result;

    }


    async updateProduct(product) {

        try {

            const result = await this.productsDAO.updateProduct(product);

            let updatedProduct = result[0];
            console.log(updatedProduct.image_url);

            if (product.image_url) {

                if (updatedProduct.image_url) {
                    //delete old photo
                    let image_url = path.join(__dirname, '..', '..', updatedProduct.image_url);
                    let fileDeleted = await this.fileLib.deleteFile(image_url);
                    console.log(fileDeleted);

                }

                //update the new photo
                const imageUpdate = await this.productsDAO.updateImage(product);
            }


            return result;

        } catch (error) {


            if (error.message === 'duplicate key value violates unique constraint "product_nombre_key"' && product.image_url) {

                //delete the upload photo
                let image_url = path.join(__dirname, '..', '..', product.image_url);
                let fileDeleted = await this.fileLib.deleteFile(image_url);

            }


            throw error

        }





    }


    async getProductWithName(name) {

        const result = await this.productsDAO.getProductWithName(name);
        return result;

    }


}



module.exports = ProductService;