const express = require("express");
const { dbConnection } = require("./config/db");
const { employeeRouter } = require("./routes/employee.route");
const cors = require("cors"); // Import the cors middleware

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/employee", employeeRouter);

app.listen(9090, async () => {
  try {
    await dbConnection;
    console.log("Connected to the DB");
  } catch (e) {
    console.log(e);
  }
  console.log("port running at 9090");
});
