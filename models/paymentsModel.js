const mongoose = require("mongoose");

const Payments = mongoose.Schema({
  price: {
    type: Number,
    required: [true, "Please provide a name"],
  },
  packageId: {
    type: String,
    required: [true, "Booking id is required"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
  },
  transactionId: {
    type: String,
  },
});
const payment = mongoose.model("payment", Payments);
module.exports = payment;
