const Order = require("../model/OrderSchema");

const saveOrder = async (req, res) => {
  //admin , manager
  try {
    const createdOrder = new Order(req.body);
    const savedOrder = await createdOrder.save();
    res.status(201).json({ message: "Order saved..", data: savedOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrder = async (req, res) => {
  //admin
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (updatedOrder) {
      return res
        .status(201)
        .json({ message: "Order updated..", data: updatedOrder });
    }
    res.status(404).json({ message: "Order not found.." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  //admin, manager
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["PENDING", "REJECTED", "COMPLETED", "CANCELED"]) {
      return res.status(400).json({ message: "Invalid status..", data: null });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );
    if (updatedOrder) {
      return res
        .status(201)
        .json({ message: "Order updated..", data: updatedOrder });
    }
    res.status(404).json({ message: "Order not found.." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteOrder = async (req, res) => {
  // admin
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (deletedOrder) {
      return res
        .status(200)
        .json({ message: "Order deleted..", data: deletedOrder });
    }
    res.status(404).json({ message: "Order not found.." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const findOrder = async (req, res) => {
  // admin, manager
  try {
    const selectedOrder = await Order.findById(req.params.id);
    if (selectedOrder) {
      return res
        .status(200)
        .json({ message: "Order found..", data: selectedOrder });
    }
    res.status(404).json({ message: "Order not found.." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loadAllOrders = async (req, res) => {
  // admin, manager
  try {
    const { page = 1, size = 10 } = req.query;
    orderList = await Order.find()
      .sort({ Date: -1 })
      .skip((page - 1) * size)
      .limit(parseInt(size));
    const total = await Order.countDocuments();
    res
      .status(200)
      .json({ message: "Order List..", data: orderList, count: total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  saveOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  findOrder,
  loadAllOrders,
};
