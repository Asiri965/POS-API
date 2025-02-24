const express = require("express");
const router = express.Router();
const OrderController = require("../controller/OrderController");
const verifyToken = require("../middleware/auth");

router.post(
  "/create",
  verifyToken(["admin", "manager"]),
  OrderController.saveOrder
);
router.put("/update/:id", verifyToken(["admin"]), OrderController.updateOrder);
router.put(
  "/update-status/:id",
  verifyToken(["admin"]),
  OrderController.updateOrderStatus
);
router.delete(
  "/delete:id",
  verifyToken(["admin"]),
  OrderController.deleteOrder
);
router.get(
  "/find/:id",
  verifyToken(["admin", "manager", "user"]),
  OrderController.findOrder
);
router.get(
  "/find-all",
  verifyToken(["admin", "manager", "user"]),
  OrderController.loadAllOrders
);

module.exports = router;
