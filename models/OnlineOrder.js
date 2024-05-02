const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const onlineOrderSchema = new Schema({
  firstName: String,
  phoneNumber: String,
  location: String,
  totalPrice: Number,
  orderdItems: Array,
});

const OnlineOrder = mongoose.model("OnlineOrder", onlineOrderSchema);
module.exports = OnlineOrder;
