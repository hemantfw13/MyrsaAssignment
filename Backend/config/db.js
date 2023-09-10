

const mongoose=require("mongoose")

const dbConnection=mongoose.connect("mongodb+srv://hemant:ahire@cluster0.q4s62o3.mongodb.net/employeeAssignment")

module.exports={
    dbConnection
}