import asyncHandler from "express-async-handler";
import { discountFunction } from "../calculate.js";
import { multipleImageUpload } from "../middleware/fileUpload.js";
import Product from "../models/products.js";

const addEditProduct = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    oldPrice,
    newPrice,
    isNew,
    inStock,
    outStock,
    title,
    setincludes,
    shortDes,
    information,
    description,
  } = req.body;
  const { id, role } = req.user;
  const user = { userId: id, role: role };
  const discount = discountFunction(120, 80);
  try {
    const images = await multipleImageUpload(req.files);
    const productObj = {
      user,
      name,
      type,
      oldPrice,
      newPrice,
      discount,
      isNew,
      inStock,
      outStock,
      title,
      setincludes,
      shortDes,
      information,
      description,
      images,
    };
    await Product.create(productObj);
    res.status(201).send({ message: "Product created successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export { addEditProduct };
