const ErrorResponse = require('../utils/errorResponse');
const Product = require('../models/Product');
const asyncHandler = require('../middleware/async');


/*
    @desc   Get all the products
    @route  GET /api/v1/products
    @access Public
*/
exports.getProducts = asyncHandler(async (req, res, next) => {
   
       const products = await Product.find();
       res.status(200).json({ success: true, count: products.length, data: products })
});

/*
    @desc   Get a specific product
    @route  GET /api/v1/product/:id
    @access Public
*/
exports.getProduct = asyncHandler(async (req, res, next) => {

        const product = await Product.findById(req.params.id);

        if(!product) {
            return  next(
                new ErrorResponse(`Product ID: ${req.params.id} was not found`, 404)
                );
        }

        res.status(200).json({ success: true, data: product });
});

/*
    @desc   Create a new product
    @route  POST /api/v1/products/:id
    @access Private
*/
exports.createProduct = asyncHandler(async (req, res, next) => {

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            data: product
        });
});


/*
    @desc   Update a specific product
    @route  PUT /api/v1/products/:id
    @access Private
*/
exports.updateProduct = asyncHandler(async (req, res, next) => {

    const product = await Product.findByIdAndUpdate(req.params.id, req.body,
        {
           new: true,
           runValidators: true
   });

   if(!product) {
    return  next(
        new ErrorResponse(`Product ID: ${req.params.id} was not found`, 404)
        );
   }
   
   res.status(200).json({ success: true, data: product });
});

/*
    @desc   Delete a specific product
    @route  DELETE /api/v1/products/:id
    @access Private
*/
exports.deleteProduct = asyncHandler(async (req, res, next) => {

        const product = await Product.findByIdAndDelete(req.params.id);

        if(!product) {
            return  next(
                new ErrorResponse(`Product ID: ${req.params.id} was not found`, 404)
                );
        }
        res.status(200).json({ success: true, 
                                data: 
                                { message: `Product with id ${req.params.id} has beeen successfully deleted.`} });
   
});