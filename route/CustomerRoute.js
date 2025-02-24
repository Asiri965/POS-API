const express = require("express");
const router = express.Router();
const CustomerController = require("../controller/CustomerController");
const verifyToken = require("../middleware/auth");

router.post(
  "/create",
  verifyToken(["admin", "manager"]),
  CustomerController.saveCustomer
);
router.put(
  "/update/:id",
  verifyToken(["admin"]),
  CustomerController.updateCustomer
);
router.delete(
  "/delete/:id",
  verifyToken(["admin"]),
  CustomerController.deleteCustomer
);
router.get(
  "/find/:id",
  verifyToken(["admin", "manager", "user"]),
  CustomerController.findCustomer
);
router.get(
  "/find-all",
  verifyToken(["admin", "manager", "user"]),
  CustomerController.loadAllCustomers
);

module.exports = router;
