import asyncHandler from "express-async-handler";
import Order from "../models/order.js";

const addOrder = asyncHandler(async (req, res) => {
  const {
    cartItems,
    billingDetails,
    shippingAddress,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  try {
    const user = req.user.id;
    if (cartItems.length <= 0) {
      res.status(400).send({ message: "No Order items" });
    } else {
      const orderItems = cartItems.map((cartItem) => {
        return { ...cartItem, product: cartItem.productId };
      });
      const orderStatus = [
        {
          type: "ordered",
          date: new Date(),
          complete: true,
        },
        {
          type: "packed",
          complete: false,
        },
        {
          type: "shipped",
          complete: false,
        },
        {
          type: "delivered",
          complete: false,
        },
      ];
      const orderObj = {
        user,
        orderItems,
        billingDetails,
        shippingAddress,
        taxPrice,
        shippingPrice,
        totalPrice,
        orderStatus,
      };
      await Order.create(orderObj);
      res.status(201).send({ message: "Order created successfully" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
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
    res.status(500).send({ message: error.message });
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "fullName email role")
      .populate(
        "orderItems.product",
        "name type oldPrice newPrice discount images"
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
    res.status(500).send({ message: error.message });
  }
});

const getMyOrder = asyncHandler(async (req, res) => {
  try {
    const orderList = await Order.find({ user: req.user.id })
      .populate("user", "fullName email role")
      .populate(
        "orderItems.product",
        "name type oldPrice newPrice discount images"
      );
    if (orderList.length > 0) {
      res.status(200).send(orderList);
    } else {
      res.status(404).send({ message: "Your order empty." });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const individualUserOrder = asyncHandler(async (req, res) => {
  try {
    const orderList = await Order.find({ user: req.params.userId })
      .populate("user", "fullName email role")
      .populate(
        "orderItems.product",
        "name type oldPrice newPrice discount images"
      );
    res.status(200).send(orderList);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  try {
    await Order.updateOne(
      { _id: req.params.id, "orderStatus.type": req.body.type },
      {
        $set: {
          "orderStatus.$": [
            { type: req.body.type, date: new Date(), complete: true },
          ],
        },
      }
    );
    // console.log(order);
    // order.orderStatus.type = req.body.type;
    // await order.save();
    res.status(202).send({ message: "Order updated successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
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
