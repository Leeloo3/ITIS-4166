const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    seller: {
        type: String,
        required: [true, 'Seller name is required'],
        trim: true
    },
    condition: {
        type: String,
        required: [true, 'Condition is required'],
        enum: ['New', 'Used']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    details: {
        type: String,
        required: [true, 'Details are required'],
        trim: true
    },
    images: [{
        type: String,
        required: [true, 'At least one image is required']
    }],
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Item', itemSchema); 