const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim : true
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        maxLength: [5, "Product price cannot exceed 5 characters"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Product category is required"],
    },
    stock: {
        type: Number,
        required: [true, "Product stock is required"],
        maxLength: [5, "Product stock cannot exceed 5 characters"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],

    user : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true 
    } ,

    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Product', productSchema);
