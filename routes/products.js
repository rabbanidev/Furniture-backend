import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProductById,
  getProductList,
  typeProductList,
} from "../controllers/products.js";
import { upload } from "../middleware/fileUpload.js";
import { isAdminRole, isLoggedIn } from "../middleware/userCheck.js";

const router = express.Router();

router.get("/product-list", getProductList);
router.get("/product-list/:type", typeProductList);
router.get("/product/:id", getProductById);

router.post(
  "/product/add",
  isLoggedIn,
  isAdminRole,
  upload.array("images", 5),
  addProduct
);
router.post(
  "/product/edit/:id",
  isLoggedIn,
  isAdminRole,
  upload.array("images", 5),
  editProduct
);
router.delete("/product/:id", isLoggedIn, isAdminRole, deleteProduct);

export default router;
