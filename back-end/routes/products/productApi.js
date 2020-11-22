'use strict';

const router = require('express').Router();


//IMPORTAMOS NUESTROS SERVICIOS
const ProductService = require('../../services/products/ProductService');





const productApi = (app) => {


    const productService = new ProductService();

    app.use('/products', router);



    router.get('/', async (req, res ,next) => {
        
        const products = await productService.getProducts();

        res.json({products});
    

    });



}




module.exports = productApi;