const mongoose = require("mongoose")
const Schema = mongoose.Schema

const dotenv = require('dotenv');
dotenv.config();

const dbUrl = process.env.DATABASE_URL;

mongoose.connect(dbUrl)

const userSchema = Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String, 
    lastName: String
})

const adminSchema = Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String, 
    lastName: String
})

const courseSchema = Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: {type: Schema.Types.ObjectId, ref: "admin"}
})

const purchaseSchema = Schema({
    userId: {type: Schema.Types.ObjectId, ref: "user"},
    courseId: {type: Schema.Types.ObjectId, ref: "course"}
})

const userModel = mongoose.Model("user", userSchema)
const adminModel = mongoose.Model("admin", adminSchema)
const courseModel = mongoose.Model("course", courseSchema)
const purchaseModel = mongoose.Model("purchase", purchaseSchema)

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}