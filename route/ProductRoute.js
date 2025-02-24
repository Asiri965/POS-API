const express = require("express");
const router = express.Router();
const ProductController = require("../controller/ProductController");
const verifyToken = require("../middleware/auth");

router.post(
  "/create",
  verifyToken(["admin", "manager"]),
  ProductController.saveProduct
);
router.put(
  "/update/:id",
  verifyToken(["admin"]),
  ProductController.updateProduct
);
router.delete(
  "/delete/:id",
  verifyToken(["admin"]),
  ProductController.deleteProduct
);
router.get(
  "/find/:id",
  verifyToken(["admin", "manager", "user"]),
  ProductController.findProduct
);
router.get(
  "/find-all",
  verifyToken(["admin", "manager", "user"]),
  ProductController.loadAllProducts
);
router.get(
  "/lower-qty-list",
  verifyToken(["admin", "manager"]),
  ProductController.findLowStockProducts
);

module.exports = router;
