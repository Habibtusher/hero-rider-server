const express = require("express");
const cors = require("cors");
const UsersRoute = require("./routes/userRoutes.js")
const PaymentRoute = require("./routes/paymentRoutes.js")
require("dotenv").config();
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECREC_KEY);
// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(express.json());
require("dotenv").config();

app.get("/", async (req, res) => {
  res.send("hello");
});
app.use("/", UsersRoute);
app.use("/", PaymentRoute);
mongoose.set("strictQuery", false);
const connection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(error);
  }
};
app.post("/create-payment-intent", async (req, res) => {
  const package = req.body;
  const price = package.price;
  const amount = price * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    currency: "usd",
    amount: amount,
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});
app.listen(port, () => {
  connection();
  console.log("running on 5000");
});
