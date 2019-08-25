const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  author: String,
  email: String,
  description: String,
  approved: Boolean,
  itemStoreId: String
});

module.exports = mongoose.model("Review", reviewSchema);
