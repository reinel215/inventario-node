'use strict';

const router = require('express').Router();


//IMPORTAMOS NUESTROS SERVICIOS
const ProductService = require('../../services/products/ProductService');





const productApi = (app) => {


    const productService = new ProductService();

    app.use('/api/products', router);



    router.get('/', async (req, res, next) => {

        try {

            const products = await productService.getProducts();
            res.json(products);

        } catch (error) {
            next(error);
        }


    });


    router.get('/:id', async (req, res, next) => {

        try {

            const id = req.params.id;

            const product = await productService.getProduct(id);

            if (product.length === 0) {

                next({ message: 'page not found' });
                return;

            }

            res.json({ product });

        } catch (error) {

            next(error);

        }

    });


    router.post('/', async (req, res, next) => {


        try {
            const product = req.body;
            const result = await productService.insertProduct(product);
            res.status(201).json({ message: "producto creado" });

        } catch (error) {

            next(error);

        }

    });



    router.delete('/:id', async (req, res, next) => {

        try {

            const id = req.params.id;
            const result = await productService.deleteProduct(id);
            res.status(204).send();

        } catch (error) {

            next(error);

        }

    });




    router.put('/:id', async (req, res, next) => {

        try {
            const id = req.params.id;
            const product = {
                ...req.body,
                id
            };

            const result = await productService.updateProduct(product);
            res.status(204).send();

        } catch (error) {

            next(error);
            
        }

    });



}




module.exports = productApi;