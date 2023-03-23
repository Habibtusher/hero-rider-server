const paymentModel = require("../models/paymentsModel.js");



const addPayments = async (req, res) => {
    const paymentInfo = req.body;



    try {
        const newPayment = await paymentModel.create(paymentInfo);

        res.status(201).json({
            status: "success",
            message: "Payment Successfully!",
            data: newPayment,
        });
    } catch (error) {
        res.send(error);

    }
};

module.exports = { addPayments };