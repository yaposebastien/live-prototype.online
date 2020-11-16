const mongoose = require('mongoose');
const slugify = require('slugify');

const ProductSchema = new mongoose.Schema(

    {
        name: {
            type: String,
            required: [true, 'Enter the product name'],
            unique: true,
            trim: true,
            maxlength: [150, 'Product name can not be more than 150 characters']
        },
        slug: String,

        description: {
            type: String,
            required: [true, 'Enter the product description'],
            unique: true,
            trim: true,
            maxlength: [500, 'Product description can not be more than 500 characters']
        },

        category: {
            type: String,
            required: [true, 'Enter the product category'],
            trim: true,
            maxlength: [500, 'Product category can not be more than 500 characters']
            
        },

        unit_price: {
            type: Number,
            required: [true, 'Enter the product unit price'],
            min: [1, 'Unit price of the product must be at least $1'],
            max: [1000000, 'Unit price of the product can not be more than $1,000,000']
        },

        picture: {
            type: String,
            default: 'default-picture.jpg'
        },

        units_in_stock: {
            type: Number,
            required: [true, 'Enter the product unit price']
        },

        createdAt: {
            type: Date,
            default: Date.now
        }

    });

    // Adding Function to create slug for the product (apple 12 --> apple-12)
    ProductSchema.pre('save', function(next) {
        this.slug = slugify(this.name, { lower: true });
        next();
    })


    module.exports = mongoose.model('Product', ProductSchema);