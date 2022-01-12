import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    image: { type: String, required: true },
    user: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Auth",
      },
      role: {
        type: String,
        required: true,
        enum: ["user"],
      },
    },
  },
  { timestamps: true }
);

const schema = mongoose.Schema(
  {
    user: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Auth",
      },
      role: {
        type: String,
        required: true,
        enum: ["admin"],
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
    },
    newPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: String,
    },
    // isNew: {
    //   type: Boolean,
    //   default: false,
    // },
    inStock: {
      type: Boolean,
      default: true,
    },
    outStock: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    setincludes: {
      type: String,
    },
    shortDes: {
      type: Array,
    },
    information: {
      shipping: {
        type: String,
        required: true,
      },
      sizeing: {
        type: String,
      },
      assistance: {
        type: String,
      },
      storeMail: {
        type: String,
      },
    },
    description: {
      type: String,
    },
    images: [
      {
        id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    reviews: [reviewSchema],
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
