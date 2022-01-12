import express from "express";
import { addEditProduct } from "../controllers/products.js";
import { upload } from "../middleware/fileUpload.js";
import { isLoggedIn } from "../middleware/userCheck.js";

const router = express.Router();

router.post("/product", isLoggedIn, upload.array("images", 5), addEditProduct);

export default router;
