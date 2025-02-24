const express = require("express");
const router = express.Router();
const PaymentController = require("../controller/PaymentController");
const verifyToken = require("../middleware/auth");

router.post(
  "/create",
  verifyToken(["admin", "manager"]),
  PaymentController.makePayment
);
router.get(
  "/income-by-day",
  verifyToken(["admin", "manager"]),
  PaymentController.findPaymentToday
);
router.get(
  "/income-by-month",
  verifyToken(["admin", "manager"]),
  PaymentController.findIncomeByCurrentMonth
);

module.exports = router;
