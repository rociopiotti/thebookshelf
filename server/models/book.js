const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "n/a",
    },
    pages: {
      type: String,
      default: "n/a",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    price: {
      type: String,
      default: "n/a",
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = { Book };
