'use strict';

const router = require('express').Router();


//IMPORTAMOS EL MODULO PARA IMAGENES
const multer = require('../../utils/middlewares/multer/multer');




//IMPORTAMOS NUESTROS SERVICIOS
const ProductService = require('../../services/products/ProductService');





const productApi = (app) => {


    const productService = new ProductService();

    app.use('/api/products', router);



    router.get('/', async (req, res, next) => {

        try {

            const products = await productService.getProducts();
            res.status(200).json(products);

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


    router.post('/',  multer ,async (req, res, next) => {


        try {
            let path;

            req.file ? path=req.file.path : null;

            const product = req.body;
            const result = await productService.insertProduct({...product, image_url : path});
            res.status(201).json({ message: "producto creado" });

        } catch (error) {

            next(error);

        }

    },);



    router.delete('/:id', async (req, res, next) => {

        try {

            const id = req.params.id;
            const result = await productService.deleteProduct(id);
            res.status(204).send();

        } catch (error) {

            next(error);

        }

    });




    router.put('/:id', multer ,async (req, res, next) => {

        try {

            

            const id = req.params.id;
            const product = {
                ...req.body,
                id,
                image_url : req.file ? req.file.path : null
            };

            const result = await productService.updateProduct(product);
            res.status(204).send();

        } catch (error) {

            next(error);

        }

    });



}




module.exports = productApi;