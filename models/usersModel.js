const mongoose = require("mongoose");

const Users = mongoose.Schema({
  full_name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true
  },
  age: {
    type: Number,
  },
  address: {
    type: String,
   
  },
  phone: {
    type: Number,
  },
  profile_pic: {
    type: String,
  },
  nid: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be at least 8 characters"],
  },
  vehicle_type: {
    type: String,
  },
  driving_licence: {
    type: String,
  },
  area: {
    type: String,
  },
  car_info: {
    name: { type: String },
    model: { type: String },
    name_palate: { type: String },
  },
  is_rider:{
    type:Boolean
  },
  is_admin:{
    type:Boolean,
    default: false
  },
  user_status:{
    type:String,
    default: "active"
  },

});

const users = mongoose.model("users", Users);
module.exports = users;
