const mongoose = require("mongoose");
const validator = require("validator")

const userSchema = mongoose.Schema({
    name:{type:String,require:true},
    email: {
        type: String,
        required: [true, "Please provide tour email address"],
        unqiue: [true, "This email address already exist"],
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email address"],
      },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        minLength: [
          6,
          "Plase make sure your password is atleast 6 characters long",
        ],
        maxLength: [
          128,
          "Plase make sure your password is less than 128 characters long",
        ],
      }
},{
    timestamps: true,
})


const UserModel = mongoose.model("USER",userSchema)

module.exports = {UserModel}