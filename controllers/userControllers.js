const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const createUser = async (req, res) => {
  const {
    full_name,
    email,
    password,
    address,
    phone,
    profilepic,
    age,
    nid,
    vehicle_type,
    driving_licence,
    area,
    car_info,
    is_rider,
  } = req.body;
  const hash = await bcrypt.hash(password, 8);

  try {
    const newUser = await usersModel.create({
      full_name,
      email,
      password: hash,
      address,
      phone,
      profile_pic: profilepic,
      age,
      nid,
      vehicle_type,
      driving_licence,
      area,
      car_info,
      is_rider,
    });
    res.status(201).json({
      status: "success",
      message: "New User Created!",
      data: newUser,
    });
  } catch (error) {
    res.send(error);
  }
};
const signIn = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await usersModel.findOne({ email: req.body.email });


    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!isPasswordCorrect) {
        return res.status(404).json({
          status: "error",
          message: "Invalid password",
        });
      } else {
        const token = jwt.sign(
          { email: req.body.email },
          process.env.ACCESS_TOKEN,
          {
            expiresIn: "90d",
          }
        );
        res.status(201).json({
          status: "success",
          message: "login succssfully!",
          accessToken: token,
          user: {
            email: user.email,

          }
        });
      }
    }
  } catch (error) {
    res.send(error);
  }
};
const getUsers = async (req, res) => {

  const limit = req.query.limit;
  const page = req.query.page || 1;
  const searchValue = req.query.search

  const query = {}
  try {

    if (req.query.ageRange) {

      const [minAge, maxAge] = req.query.ageRange.split('-');
      query.age = { $gte: minAge, $lte: maxAge };
    }
    if (searchValue) {
      if (searchValue.includes("@")) query.email = searchValue
      else if (searchValue && !isNaN(Number(searchValue))) query.phone = searchValue;
      else query.full_name = searchValue;
    }


    const users = await usersModel.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await usersModel.find(query)

    res.json({
      users,
      totalData: count.length,
      currentPage: page
    });

  } catch (error) {
    res.send(error);

  }
};
const getUser = async (req, res) => {
  try {

    const user = await usersModel.findOne({ email: req.query.email });
    if (user) {
      res.status(201).json({
        status: "success",

        data: user,
      });
    }
    else {
      res.status(404).json({
        status: "error",
        message: "user not found"

      });
    }


  } catch (error) {

  }
}
const blockUser = async (req, res) => {
  const id = req.body.id;

  const filter = {
    _id: new ObjectId(id),

  };
  const updateDoc = {
    $set: {
      user_status: "blocked",
    }
  }
  try {
    await usersModel.updateOne(filter, updateDoc)
    res.status(201).json({
      status: "success",
      message: "user blocked successfully"

    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "something went wrong",
      error: error
    });
  }
}
const blockUsers = async (req, res) => {
  const ids = req.body.ids;
  try {
    await usersModel.updateMany({ _id: { $in: ids } }, { user_status: "blocked" })
    res.status(201).json({
      status: "success",
      message: "users blocked successfully"

    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "something went wrong",
      error: error
    });
  }
}
module.exports = { createUser, getUsers, signIn, getUser, blockUser, blockUsers };
