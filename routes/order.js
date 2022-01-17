import express from "express";
import {
  addOrder,
  getMyOrder,
  getOrderById,
  getOrderList,
  individualUserOrder,
  updateOrder,
} from "../controllers/order.js";
import { isAdminRole, isLoggedIn } from "../middleware/userCheck.js";

const router = express.Router();

router.post("/add-order", isLoggedIn, addOrder);
router.get("/order/:id", isLoggedIn, getOrderById);
router.get("/order-list/my-order", isLoggedIn, getMyOrder);
// Admin Route
router.get("/order-list", isLoggedIn, isAdminRole, getOrderList);
router.get("/order-list/:userId", isLoggedIn, isAdminRole, individualUserOrder);
router.post("/order/update/:id", isLoggedIn, isAdminRole, updateOrder);

export default router;
