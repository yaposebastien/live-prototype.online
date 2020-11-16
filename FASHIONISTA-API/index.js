const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');  // Logger module for nodejs
const connectDB = require('./config/mongodb');  // MongoDB connection
dotenv.config({ path: './config/config.env' });  // Loading the environ variables
const cors = require('cors');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload'); // For image upload

// Connecting to the MongoDB 
connectDB();

// Loading all the routes of the application
const products = require('./routes/product');


const app = express();

// Loading Body Parser
app.use(express.json());


// Loading Logger module called morgan while in development environment
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// File Upload
app.use(fileupload());

// Enable CORS
app.use(cors());

// Setting Satatic Folder
app.use(express.static(path.join(__dirname, 'public')));


// Mounting Routers of the application
app.use('/api/v1/products', products);

// Loading error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, 
           console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.inverse));

/*
This following will handle unexpected promise rejection during MongoDB operations
*/
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // After crash, Close and exit the process
    server.close(() => process.exit(1));
})