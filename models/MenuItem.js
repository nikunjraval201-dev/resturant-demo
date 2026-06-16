const mongoose = require("mongoose");

// const menuSchema = new mongoose.Schema({
//   categoryId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Category",
//   },
//   name: String,
//   description: String,
//   price: Number,
//   image: String,
//   isAvailable: {
//     type: Boolean,
//     default: true,
//   },
// });

const menuItemSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: String,

    price: {
      type: Number,
      required: true,
    },

    image: String,

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("MenuItem", menuItemSchema);
