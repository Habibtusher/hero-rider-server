const express = require("express");
const { addPayments } = require("../controllers/paymentControllers");




const router = express.Router();


router.post('/add-payment',addPayments)



module.exports = router;