const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  category: String,
  title: String,
  price: Number,
  img: String,
  desc: String,
});

const Menu = mongoose.model("MenuItem", menuSchema);
module.exports = Menu;
