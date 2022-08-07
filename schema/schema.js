const {} = require("express-graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLFloat, GraphQLNonNull } = require("graphql");
const Course = require("../models/Courses/Course");

//chapter topic type
const ChapterTopicType = new GraphQLObjectType({
    name:"chapter",
    fields:()=>({
        topicName: {type: GraphQLString},
        videoLink: {type: GraphQLString},
    })
})


//course syllabus type
const CourseSyllabusType = new GraphQLObjectType({
    name:"syllabus",
    fields:()=>({
        chapterName: {type: GraphQLString},
        chapterTopic: {type: GraphQLList(ChapterTopicType)}
    })
})

//course type
const CourseType = new GraphQLObjectType({
    name:"course",
    fields:()=>({
        id: {type: GraphQLID},
        courseName: {type: GraphQLString},
        youWillLearn: {type: GraphQLList(GraphQLString)},
        about: {type: GraphQLString},
        youWillGet: {type: GraphQLList(GraphQLString)},
        whoIsCourseFor: {type: GraphQLList(GraphQLString)},
        // courseSyllabus: {type: GraphQLList(CourseSyllabusType)},
        certificateImage: {type: GraphQLString},
        promoCode: {type: GraphQLString},
        totalStudent: {type: GraphQLInt},
        totalTime: {type: GraphQLFloat},
        totalVideo: {type: GraphQLInt},
        totalQuize: {type: GraphQLInt},
        totalNote: {type: GraphQLInt},
        totalTranscript: {type: GraphQLInt},
        introVideo: {type: GraphQLString},
        courseType: {type: GraphQLString}
    })
})


//root query
const RootQuery = new GraphQLObjectType({
    name: "rootquery",
    fields:{
        //get all courses
        courses:{
            type: GraphQLList(CourseType),
            resolve(parent, args){
                return Course.find();
            }
        },

        //get single course by id
        course:{
            type: CourseType,
            args: {id: {type: GraphQLID}},
            resolve(patent, args){
                return Course.findById(args.id);
            }
        },

        //get courses by course type
        courseType:{
            type: CourseType,
            args: {courseType: {type: GraphQLString}},
            resolve(parent, args){
                return Course.find({courseType: args.courseType})
            }
        }
    }
})

//mutation
const Mutation = new GraphQLObjectType({
    name: "mutation",
    fields:{
        //add course
        addCourse:{
            type: CourseType,
            args:{
                courseName: {type: GraphQLNonNull(GraphQLString)},
                youWillLearn: {type: GraphQLNonNull(GraphQLList(GraphQLString))},
                about: {type: GraphQLNonNull(GraphQLString)},
                youWillGet: {type: GraphQLNonNull(GraphQLList(GraphQLString))},
                whoIsCourseFor: {type: GraphQLNonNull(GraphQLList(GraphQLString))},
                // courseSyllabus: {type: GraphQLNonNull(GraphQLList(CourseSyllabusType))},
               
                certificateImage: {type: GraphQLNonNull(GraphQLString)},
                courseImage: {type: GraphQLNonNull(GraphQLString)},
                promoCode: {type: GraphQLNonNull(GraphQLString)},
                totalStudent: {type: GraphQLNonNull(GraphQLInt)},
                totalTime:  {type: GraphQLNonNull(GraphQLFloat)},
                totalVideo: {type: GraphQLNonNull(GraphQLInt)},
                totalQuize: {type: GraphQLNonNull(GraphQLInt)},
                totalNote: {type: GraphQLNonNull(GraphQLInt)},
                totalTranscript: {type: GraphQLNonNull(GraphQLInt)},
                introVideo: {type: GraphQLNonNull(GraphQLString)},
                courseType: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                const course = new Course({
                    courseName: args.courseName,
                    youWillLearn: args.youWillLearn,
                    about: args.about,
                    youWillGet: args.youWillGet,
                    whoIsCourseFor: args.whoIsCourseFor,
                    // courseSyllabus: args.courseSyllabus,
                    certificateImage: args.certificateImage,
                    courseImage:args.courseImage,
                    promoCode: args.promoCode,
                    totalStudent: args.totalStudent,
                    totalTime: args.totalTime,
                    totalVideo: args.totalVideo,
                    totalQuize: args.totalQuize,
                    totalNote: args.totalNote,
                    introVideo: args.introVideo,
                    courseType: args.courseType
                })
                return course.save();
            }
        }
    }
    
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})