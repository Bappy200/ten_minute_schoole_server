const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:{type: String, require: true},
    class:{type: String},
    group:{type: String},
    image: {type: String, require: true},
    city: {type: String},
    institute: {type: String},
    phone: {type: String},
    email: {type: String},
    password: {type: String},
    coursesId:[{type: mongoose.Types.ObjectId, ref: "Course"}]
})

module.exports = mongoose.model("User", UserSchema);