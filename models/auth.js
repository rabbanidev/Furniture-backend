import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const schema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      default: null,
    },
    password: {
      type: String,
      min: 8,
      max: 16,
      required: true,
    },
    avater: {
      type: String,
      required: true,
      default: "https://image.flaticon.com/icons/png/512/149/149071.png",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    billingDetails: {
      firstName: { type: String },
      lastName: { type: String },
      companyName: { type: String },
      country: { type: String },
      streetAddress: { type: String },
      apartment: { type: String },
      city: { type: String },
      state: { type: String },
      phone: { type: String },
      email: { type: String },
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
  },
  { timestamps: true }
);

// Password Hash
schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Replace _id to id
schema.virtual("id").get(function () {
  return this._id.toHexString();
});
schema.set("toJSON", {
  virtuals: true,
});

const Auth = mongoose.model("Auth", schema);

export default Auth;
