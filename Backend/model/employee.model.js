const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
  name: String,
  age: Number,
  qualification: String,
  location: String,
  experience: Number,
});

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = {
  employeeModel,
};
