const express = require('express');
const { Router } = require('express');

// Loading Products Controller
const {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    productPhotoUpload
} = require('../controllers/products');

const router = express.Router();

// Path route for the photo
router.route('/:id/photo').put(productPhotoUpload);


// Path route without parameters
router 
    .route('/')
    .get(getProducts)
    .post(createProduct);

// Path route with parameters
router.route('/:id')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);


module.exports = router;










