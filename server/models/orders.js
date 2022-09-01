const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    addressFirstLine: {
        type: String,
        required: true,
    },
    addressSecondLine: {
        type: String,
    },
    town: {
        type: String,
        required: true,
    },
    postCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    order: {
        type: Array,
        required: true,
    }, 
    cost: {
        type: Number,
    },
    date: {
        type: String,
    }, 
    orderNo: {
        type: String,
    } 
})

const OrderModel = mongoose.model("orders", OrderSchema);

module.exports = OrderModel;