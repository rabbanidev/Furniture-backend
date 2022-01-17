import asyncHandler from "express-async-handler";
import Order from "../models/order.js";

const addOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    billingDetails,
    shippingAddress,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  try {
    const user = req.user.id;
    if (orderItems.length <= 0) {
      res.status(400).send({ message: "No Order items" });
    } else {
      const orderObj = {
        user,
        orderItems,
        billingDetails,
        shippingAddress,
        taxPrice,
        shippingPrice,
        totalPrice,
      };
      await Order.create(orderObj);
      res.status(201).send({ message: "Order created successfully" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const getOrderList = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate(
        "orderItems.product",
        "name type oldPrice newPrice discount images"
      )
      .populate("user", "fullName email role");
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "fullName email role"
    );
    if (
      (order && order.user === req.user.id) ||
      (order && req.user.role === process.env.ROLE)
    ) {
      res.status(200).send(order);
    } else {
      res.status(404).send({ message: "Order not found" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const getMyOrder = asyncHandler(async (req, res) => {
  try {
    const orderList = await Order.find({ user: req.user.id }).populate(
      "user",
      "fullName email role"
    );
    if (orderList.length > 0) {
      res.status(200).send(orderList);
    } else {
      res.status(400).send({ message: "Your order empty." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const individualUserOrder = asyncHandler(async (req, res) => {
  try {
    const orderList = await Order.find({ user: req.params.userId }).populate(
      "user",
      "fullName email role"
    );
    res.status(200).send(orderList);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.orderStatus.type = req.body.type;
    await order.save();
    res.status(201).send({ message: "Order updated successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export {
  addOrder,
  getOrderList,
  getOrderById,
  getMyOrder,
  individualUserOrder,
  updateOrder,
};
