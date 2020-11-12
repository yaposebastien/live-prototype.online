const mongoose = require('mongoose');

// Promise to connect to the MongoDB
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log(`MongoDB is connected: ${conn.connection.host}`.blue.underline.bold);
};

module.exports = connectDB;