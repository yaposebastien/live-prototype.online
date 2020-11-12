/*
Function to customize error handling during CRUD Operations
*/

const ErrorResponse = require("../utils/errorResponse");

const errorHandler =  (err, req, res, next) => {
    let error = { ...err }

    error.message = err.message;
    console.log(err)

    // Catching customized error handling for the mongoose oblect id
    if( err.name == 'CastError') {
        const message = `Product ID: ${err.value} was not found.`;
        error = new ErrorResponse(message, 404);
    }

    // Catching error concerning duplicate key
    if(err.code === 11000) {
        const message = 'Product name already existed';
        error = new ErrorResponse(message,400)
    }

    // Catching error for field validation and returning array of validation message
    if(err.name === 'ValidationError') {
        // Retrieve list of validation comming from err
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error Found'
    });
};

module.exports = errorHandler;