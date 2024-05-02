const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specialSchema = new Schema({
  title: String,
  price: Number,
  img: String,
  description: String,
});

const Special = mongoose.model("Special", specialSchema);
module.exports = Special;
