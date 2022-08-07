const mongoors = require("mongoose");

const Chaptertopic = mongoors.Schema({
    topicName:{type: String, require: true},
    videoLink:{type: String, require: true}
})

const Coursesyllabus = mongoors.Schema({
    chapterName:{type: String, require: true},
    chapterTopic:[Chaptertopic],
});

const CourseSchema = mongoors.Schema({
    courseName:{
        type: String,
        require: true
    },
    youWillLearn:[
        {type: String, 
        require: true}
    ],
    about: {
        type: String,
        require: true
    },
    youWillGet:[
        {type: String}
    ],
    whoIsCourseFor:[
        {type: String}
    ],
    courseSyllabus:[Coursesyllabus],
    certificateImage:{
        type: String, 
        require: true
    },
    courseImage: {
        type: String, 
        require: true
    },
    promoCode: {
        type: String
    },
    totalStudent: {
        type: Number, 
        require: true
    },
    totalTime: {
        type: String, 
        require: true
    },
    totalVideo: {
        type: Number, 
        require: true
    },
    totalQuize: {
        type: Number, 
        require: true
    },
    totalNote:{
        type: Number,
        require: true,
    },
    totalTranscript:{
        type:Number,
        require: true,
    },
    introVideo:{
        type: String,
        require: true,
    },
    courseType:{
        type: String,
        require: true,
    }
})

module.exports = mongoors.model("Course", CourseSchema);