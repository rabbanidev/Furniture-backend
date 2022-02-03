import asyncHandler from "express-async-handler";
import { discountFunction } from "../calculate.js";
import {
  multipleImageUpload,
  singleImageUpload,
} from "../middleware/fileUpload.js";
import Product from "../models/products.js";

const getProductList = asyncHandler(async (req, res) => {
  try {
    const productList = await Product.find({}).select(
      "name type oldPrice newPrice discount inStock outStock title setincludes shortDes information description images banner"
    );
    res.status(200).send(productList);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const typeProductList = asyncHandler(async (req, res) => {
  try {
    const { type } = req.params;
    const productList = await Product.find({ type }).select(
      "name type oldPrice newPrice discount inStock outStock title setincludes shortDes information description images"
    );
    res.status(200).send(productList);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const bannerProductList = asyncHandler(async (req, res) => {
  try {
    const productList = await Product.find({})
      .limit(3)
      .select("name type oldPrice newPrice discount banner");
    res.status(200).send(productList);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).select(
      "name type oldPrice newPrice discount inStock outStock title setincludes shortDes information description images"
    );
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const addProduct = asyncHandler(async (req, res) => {
  try {
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
      shipping,
      sizeing,
      assistance,
      storeMail,
      description,
    } = req.body;
    const information = {
      shipping,
      sizeing,
      assistance,
      storeMail,
    };
    const { id: userId, role } = req.user;
    const user = { userId, role };
    if (req.files.images.length > 0) {
      const images = await multipleImageUpload(req.files.images);
      const banner = await singleImageUpload(req.files.banner[0].path);

      const productObj = {
        user,
        name,
        type,
        oldPrice,
        newPrice,
        discount: discountFunction(oldPrice, newPrice),
        isNew,
        inStock,
        outStock,
        title,
        setincludes,
        shortDes,
        information,
        description,
        images,
        banner: banner.url,
      };
      await Product.create(productObj);
      res.status(201).send({ message: "Product created successfully" });
    } else {
      res.status(400).send({ message: "Product images not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const editProduct = asyncHandler(async (req, res) => {
  try {
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
      shipping,
      sizeing,
      assistance,
      storeMail,
      description,
    } = req.body;
    const information = {
      shipping,
      sizeing,
      assistance,
      storeMail,
    };
    const { id: userId, role } = req.user;
    const user = { userId, role };
    const product = await Product.findById(req.params.id);
    if (product) {
      const images = await multipleImageUpload(req.files.images);
      const banner = await singleImageUpload(req.files.banner[0].path);

      product.user = user;
      product.name = name;
      product.type = type;
      product.oldPrice = oldPrice;
      product.newPrice = newPrice;
      product.discount = discountFunction(oldPrice, newPrice);
      product.isNew = isNew;
      product.inStock = inStock;
      product.outStock = outStock;
      product.title = title;
      product.setincludes = setincludes;
      product.shortDes = shortDes;
      product.information = information;
      product.description = description;
      product.images = images;
      product.banner = banner.url;
      await product.save();
      res.status(204).send({ message: "Product update successfully" });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      await product.delete();
      res.status(202).send({ message: "Delete successfully" });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export {
  getProductList,
  typeProductList,
  bannerProductList,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
};
