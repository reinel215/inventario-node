const ProductService = require('../../../services/products/ProductService');


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

    if( (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') ){

        callback(null,true);

    }else{

        console.log(product);
        callback(new Error("ese producto ya existe"),false);

    }



}


const upload = multer({ storage, fileFilter });




module.exports = upload.single('productImage');