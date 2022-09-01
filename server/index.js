require('dotenv').config();

const STRIPE_KEY = process.env.STRIPE_KEY;
const MONGO_STRING = process.env.MONGO_STRING;

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ProductModel = require('./models/products');
const OrderModel = require('./models/orders');
const stripe = require("stripe")(STRIPE_KEY);
const cors = require("cors");
app.use(cors());
app.use(express.json());

const mongoString = MONGO_STRING;

mongoose.connect(mongoString);

mongoose.connection.on("error", function(error) {
  console.log(error)
});

mongoose.connection.on("open", function() {
  console.log("Connected to MongoDB database.")
});

app.get("/getProducts", async (request, response) => {
    try {
        const result = await ProductModel.find({});
        response.send(result);
      } catch (error) {
        response.status(500).send(error);
      }
});

app.post("/payment", cors(), async (request, response) => {
  let {amount, id} = request.body;
  try{
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "GBP",
      description: "item",
      payment_method: id,
      confirm: true
    });
    console.log("Payment", payment);
    response.json({message: 'Payment successful', success: true});
  }catch(error){
    console.log("Error", error);
    response.json({message: 'Payment failed', success: false});
  }
});

app.post("/submitOrder", async (request, response) => {
      const order = request.body;
      const newOrder = new OrderModel(order);
      await newOrder.save();
      response.json(order);
});

app.post("/updateInventory", async (request, response) => {
  let orders = request.body;
  function setQuantity(value) {
    let id = value._id;
    let stock = value.noOfItems;
    let quantity = value.quantity;
    let newStock = stock-quantity;
  ProductModel.findByIdAndUpdate({_id: id},{noOfItems: newStock},
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }
  orders.forEach(setQuantity);
});

app.listen(8080, ()=> {
    console.log('Server is working');
});