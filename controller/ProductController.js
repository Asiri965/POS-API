const Product = require("../model/ProductSchema");

const saveProduct = async (req, res) => {
  //admin , manager
  try {
    const createdProduct = new Product(req.body);
    const savedProduct = await createdProduct.save();
    res.status(201).json({ message: "Product saved..", data: savedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateProduct = async (req, res) => {
  //admin
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (updatedProduct) {
      return res
        .status(201)
        .json({ message: "Product updated..", data: updatedProduct });
    }
    res.status(404).json({ message: "Product not found.." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const deleteProduct = async (req, res) => {
  // admin
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      return res
        .status(200)
        .json({ message: "product deleted..", data: deletedProduct });
    }
    res.status(404).json({ message: "Product not found.." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const findProduct = async (req, res) => {
  // admin, manager, user
  try {
    const selectedProduct = await Product.findById(req.params.id);
    if (selectedProduct) {
      return res
        .status(200)
        .json({ message: "Product found..", data: selectedProduct });
    }
    res.status(404).json({ message: "Product not found.." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const loadAllProducts = async (req, res) => {
  // admin, manager, user
  try {
    const { searchText, page = 1, size = 10 } = req.query;
    const filter = searchText
      ? {
          $or: [
            { productName: { $regex: searchText, $options: "i" } },
            { description: { $regex: searchText, $options: "i" } },
          ],
        }
      : {};
    const orderList = await Product.find(filter)
      .skip((page - 1) * size)
      .limit(parseInt(size));
    const total = await Product.countDocuments(filter);
    res
      .status(200)
      .json({ message: "Product List..", data: orderList, count: total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const findLowStockProducts = async (req, res) => {
  //admin , manager
  try {
    const dataList = await Product.findLowStockProducts();
    res.status(201).json({ message: "lower qty list..", data: dataList });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  saveProduct,
  updateProduct,
  deleteProduct,
  findProduct,
  loadAllProducts,
  findLowStockProducts,
};
