'use strict';

const router = require('express').Router();


//IMPORTAMOS EL MODULO PARA IMAGENES
const multer = require('multer');
const storage = multer.diskStorage({

    destination: function (req, file, callback) {

        callback(null,'public/');

    },

    filename: function (req,file,callback) {

        callback(null, new Date().toISOString() + req.body.nombre + file.originalname);

    }

});


const fileFilter = async (req,file,callback) =>{

    const productService = new ProductService();
    const product =  await productService.getProductWithName(req.body.nombre);

    if( (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') && product.length===0 ){

        callback(null,true);

    }else{

        console.log(product);
        callback(new Error("ese producto ya existe"),false);

    }



}


const upload = multer({ storage, fileFilter });





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


    router.post('/',  upload.single('productImage') ,async (req, res, next) => {


        try {

            const product = req.body;

            const result = await productService.insertProduct({...product, image_url : req.file.path});
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