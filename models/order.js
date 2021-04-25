const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
  ],
  shippingAddress1: {
    type: String,
    required: true,
  },
  shippingAddress2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});
orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orderSchema.set("toJSON", {
  virtuals: true,
});

exports.Order = mongoose.model("Order", orderSchema);

/**
 *
 * Order Example
 *
 * {
 *  "orderItems": [
 *  {
 *   "quantity" :2,
 *   "product": "605aeedcbf6ada49bcabdbf1"
 * },
 * {
 * "quantity":4
 * "product": "605aee8b17312735d4d750a6"
 * }
 * ],
 * "shippingAddress1":"Flowers street,4",
 * "shippingAddress2": "",
 * "city" : "Pragae",
 * "zip" : "30292"
 * "country": "Ireland",
 * "phone": "393-2292233",
 * "user": "605ce096f700ee2c3455d393"
 * }
 */
