const Customer = require("../model/CustomerSchema");

const saveCustomer = async (req, res) => {
  //admin , manager
  try {
    const createdCustomer = new Customer(req.body);
    const savedCustomer = await createdCustomer.save();
    res.status(201).json({ message: "Customer saved..", data: saveCustomer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateCustomer = async (req, res) => {
  //admin
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (updatedCustomer) {
      return res
        .status(201)
        .json({ message: "Customer updated..", data: updatedCustomer });
    }
    res.status(404).json({ message: "Customer not found.." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteCustomer = async (req, res) => {
  // admin
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (deletedCustomer) {
      return res
        .status(200)
        .json({ message: "Customer deleted..", data: deletedCustomer });
    }
    res.status(404).json({ message: "Customer not found.." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const findCustomer = async (req, res) => {
  // admin, manager, user
  try {
    const selectedCustomer = await Customer.findById(req.params.id);
    if (selectedCustomer) {
      return res
        .status(200)
        .json({ message: "Customer found..", data: selectedCustomer });
    }
    res.status(404).json({ message: "Customer not found.." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const loadAllCustomers = async (req, res) => {
  // admin, manager, user
  try {
    const { searchText, page = 1, size = 10 } = req.query;
    const filter = searchText
      ? {
          $or: [
            { customerName: { $regex: searchText, $options: "i" } },
            { address: { $regex: searchText, $options: "i" } },
            { email: { $regex: searchText, $options: "i" } },
          ],
        }
      : {};
    const customerList = await Customer.find(filter)
      .skip((page - 1) * size)
      .limit(parseInt(size));
    const total = await Customer.countDocuments(filter);
    res
      .status(200)
      .json({ message: "Customer List..", data: customerList, count: total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  saveCustomer,
  updateCustomer,
  deleteCustomer,
  findCustomer,
  loadAllCustomers,
};
