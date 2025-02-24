const Payment = require("../model/PaymentSchema");

const makePayment = async (req, res) => {
  //admin , manager
  try {
    const createdPayment = new Payment(req.body);
    const savedPayment = await createdPayment.save();
    res.status(201).json({ message: "Payment saved..", data: savedPayment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const findPaymentToday = async (req, res) => {
  //admin , manager
  try {
    const { day } = req.query; // YYYY-MM-DD
    const startDay = new Date(day);
    const endDay = new Date(day);

    endDay.setDate(endDay.getDate() + 1);
    const data = await Payment.find({
      Date: {
        $gte: startDay,
        $lt: endDay,
      },
    });
    const totalIncome = data.reduce((sum, payment) => {
      sum + payment.amount, 0;
    });
    res.status(200).json({ message: "today's income..", data: totalIncome });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const findIncomeByCurrentMonth = async (req, res) => {
  //admin , manager
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const data = await Payment.find({
      Date: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });
    const incomeByDay = data.reduce((acc, payment) => {
      const day = payment.Date.toISOString().split("T")[0];
      acc[day] = (acc[day] || 0) + payment.amount;
      return acc;
    });
    res.status(200).json({
      message: "month income..",
      data: { month: now.getMonth() + 1, income: incomeByDay },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { makePayment, findPaymentToday, findIncomeByCurrentMonth };
