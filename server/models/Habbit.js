const mongoose = require("../config/config");

const habbitSchema = new mongoose.Schema({
  name: String,
  category: String,
  completed: { type: Number, default: 0 },
  target: Number,
  finishedToday: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});

// Create a model based on the schema
const Habbit = mongoose.model("Habbit", habbitSchema, "habbits");

module.exports = Habbit;
