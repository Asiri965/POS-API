const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  qtyOnHand: {
    type: Array,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  images: {
    type: Array, // s3 bucket
    required: true,
  },
});

ProductSchema.statics.findLowStockProducts = function () {
  return this.find({ qtyOnHand: { $lt: 10 } });
};

module.exports = mongoose.model("Product", ProductSchema);
