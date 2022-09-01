const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    productType: {
        type: String,
        required: true,
    },
    noOfItems: {
        type: Number,
        required: true,
    }
})

const ProductModel = mongoose.model("items", ProductSchema);

module.exports = ProductModel;