import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Auth",
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
      },
    ],
    billingDetails: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      companyName: { type: String },
      country: { type: String, required: true },
      streetAddress: { type: String, required: true },
      apartment: { type: String },
      city: { type: String, required: true },
      state: { type: String },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    shippingAddress: {
      firstName: { type: String },
      lastName: { type: String },
      companyName: { type: String },
      country: { type: String },
      streetAddress: { type: String },
      apartment: { type: String },
      city: { type: String },
      district: { type: String },
      postalCode: { type: String },
      orderNotes: { type: String },
    },
    orderDate: { type: Date, default: new Date() },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["cod", "card"],
      default: "cod",
    },
    orderStatus: {
      type: {
        type: String,
        enum: ["ordered", "packed", "shipped", "delivered"],
        default: "ordered",
      },
    },
  },
  { timestamps: true }
);

// Replace _id to id
schema.virtual("id").get(function () {
  return this._id.toHexString();
});
schema.set("toJSON", {
  virtuals: true,
});

const Order = mongoose.model("order", schema);

export default Order;
