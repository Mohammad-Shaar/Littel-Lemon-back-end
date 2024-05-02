const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  options: Object,
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
