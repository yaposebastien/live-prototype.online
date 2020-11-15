const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Product = require('./models/Product');


// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
    try {
      await Product.create(products);
      //await Course.create(courses);
      //await User.create(users);
      //await Review.create(reviews);
      console.log('Data Imported...'.green.inverse);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete data
const deleteData = async () => {
    try {
      await Product.deleteMany();
      //await Course.deleteMany();
      //await User.deleteMany();
      //await Review.deleteMany();
      console.log('Data Destroyed...'.red.inverse);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  };
  
  if (process.argv[2] === '-i') {
    importData();
  } else if (process.argv[2] === '-d') {
    deleteData();
  }
  