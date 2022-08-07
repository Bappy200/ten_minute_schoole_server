const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:{type: String, require: true},
    class:{type: String},
    group:{type: String},
    image: {type: String},
})

module.exports = mongoose.model("User", UserSchema);