import express from "express";
import {
  addEditProduct,
  deleteProduct,
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
  "/product",
  isLoggedIn,
  isAdminRole,
  upload.array("images", 5),
  addEditProduct
);
router.delete("/product/:id", isLoggedIn, isAdminRole, deleteProduct);

export default router;
