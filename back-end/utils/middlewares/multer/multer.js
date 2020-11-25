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




module.exports = upload.single('productImage');