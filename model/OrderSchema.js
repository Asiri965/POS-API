const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String, // PENDING, REJECTED, COMPLETED, CANCELED
    required: true,
  },
  Customer: {
    type: Number,
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
