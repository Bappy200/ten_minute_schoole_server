const mongoose = require("mongoose");

const InstructorShema = mongoose.Schema({
    name:{type: String, require: true},
    study:{type: String},
    occupation:{type: String},
    image: {type: String, require:true}
})

module.exports = mongoose.model("Instructor", InstructorShema);