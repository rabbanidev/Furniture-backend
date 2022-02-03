import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    user: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Auth",
      },
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    oldPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    newPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      required: true,
    },
    setincludes: {
      type: String,
      default: "",
    },
    shortDes: {
      type: Array,
      default: [],
    },
    information: {
      shipping: {
        type: String,
        default: "",
      },
      sizeing: {
        type: String,
        default: "",
      },
      assistance: {
        type: String,
        default: "",
      },
      storeMail: {
        type: String,
        default: "",
      },
    },
    description: {
      type: String,
      default: "",
    },
    images: [
      {
        id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    banner: { type: String, required: true },
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

const Product = mongoose.model("Product", schema);

export default Product;
