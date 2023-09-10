const express = require("express");
const { employeeModel } = require("../model/employee.model");

const employeeRouter = express.Router();

// GET /api/employee retrieve all employees
employeeRouter.get("/", async (req, res) => {
  const employee = await employeeModel.find();
  res.send(employee);
});

// GET /api/employee/:id retrieve a employee by :id
employeeRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const rest = await employeeModel.findOne({ _id: id });
  res.status(200).send(rest);
});

// GET /api/employee?name=[keyword] find all employees whose name contains the specified keyword
employeeRouter.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const employees = await employeeModel.find({
      name: { $regex: name, $options: "i" },
    });
    res.status(200).send(employees);
  } catch (e) {
    res.status(500).send({ msg: "Something went wrong", error: e.message });
  }
});

// POST /api/employee create new employee
employeeRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const employee = new employeeModel(payload);
    await employee.save();
    res.send({ msg: "employee add successfully" });
  } catch (e) {
    res.send({ msg: "Something went wrong", error: e.message });
  }
});

// DELETE /api/employee/:id delete a employee by :id
employeeRouter.delete("/:id", async (req, res) => {
  const employeeID = req.params.id;
  const employee = await employeeModel.findOne({ _id: employeeID });

  try {
    if (employee) {
      await employeeModel.findByIdAndDelete({ _id: employeeID });
      res.send({ msg: "employee deleted successfully" });
    } else {
      res.send({ msg: "employee not found" });
    }
  } catch (e) {
    res.send({ msg: "Something went wrong", error: e.message });
  }
});

// DELETE /api/employee delete all employees
employeeRouter.delete("/", async (req, res) => {
  try {
    await employeeModel.deleteMany({});
    res.send({ msg: "All employees deleted successfully" });
  } catch (e) {
    res.status(500).send({ msg: "Something went wrong", error: e.message });
  }
});

// PUT /api/employee/:id update a employee by :id
employeeRouter.put("/:id", async (req, res) => {
  const payload = req.body;
  const employeeID = req.params.id;
  const employee = await employeeModel.findOne({ _id: employeeID });

  try {
    if (employee) {
      await employeeModel.findByIdAndUpdate({ _id: employeeID }, payload);
      res.send({ msg: "employee updated successfully" });
    } else {
      res.send({ msg: "employee not found" });
    }
  } catch (e) {
    res.send({ msg: "Something went wrong", error: e.message });
  }
});

module.exports = {
  employeeRouter,
};
