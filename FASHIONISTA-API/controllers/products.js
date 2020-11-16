const path = require('path');
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
       res.status(200).json({ success: true, count: products.length, products: products })
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


exports.productPhotoUpload = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return  next(
            new ErrorResponse(`Product ID: ${req.params.id} was not found`, 404)
            );
    }

    // Checking for files
    if(!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }

    const file = req.files.file;

    // Checking for files if images
    if(!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }

    // Checking the image size
    if(file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`Please upload an image size less 100MB.`, 400));
    } 

    // Create custom name for the image file
    file.name = `photo_${product._id}${path.parse(file.name).ext}`;

    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
      if (err) {
        console.error(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      } 
  
      await Product.findByIdAndUpdate(req.params.id, { picture: file.name });
  
      res.status(200).json({
        success: true,
        data: file.name
      });

    })
});