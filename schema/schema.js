const {} = require("express-graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLFloat, GraphQLNonNull, GraphQLInputObjectType, graphqlSync } = require("graphql");
const Course = require("../models/Courses/Course");
const Instructor = require("../models/Instructor");
const User = require("../models/User");

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
});


//instructor type
const InstructorType = new GraphQLObjectType({
    name: "instructor",
    fields:()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        study: {type: GraphQLString},
        occupation: {type: GraphQLString},
        image: {type: GraphQLString},
        coursesId: {type: GraphQLList(GraphQLID)}
    })
});


//user type
const UserType = new GraphQLObjectType({
    name: "user",
    fields:()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        class: {type: GraphQLString},
        group: {type: GraphQLString},
        city: {type: GraphQLString},
        institute: {type: GraphQLString},
        image: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
        coursesId :{type: GraphQLList(GraphQLID)}
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
        },

        //get all instructor
        instructors:{
            type: GraphQLList(InstructorType),
            resolve(parent, args){
                return Instructor.find();
            }
        },

        //get instructor by id
        instructor:{
            type: InstructorType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                return Instructor.findById(args.id);
            }
        },

        //get all users
        users:{
            type: GraphQLList(UserType),
            resolve(parent, args){
                return User.find();
            }
        },

        //get user by id
        user:{
            type: UserType,
            args: {id:{type: GraphQLNonNull(GraphQLID)}},
            resolve(parent, args){
                return User.findById(args.id);
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
        },

        //delete course
        deleteCourse:{
            type: CourseType,
            args:{id:{type: GraphQLNonNull(GraphQLID)}},
            resolve(parent, args){
                return Course.findByIdAndDelete(args.id);
            }
        },

        //add instructor
        addInstructor:{
            type: InstructorType,
            args:{
                name: {type: GraphQLNonNull(GraphQLString)},
                study: {type: GraphQLString},
                occupation: {type: GraphQLString},
                image: {type: GraphQLNonNull(GraphQLString)},
                coursesId: {type: GraphQLList(GraphQLID)},
            },
            resolve(parent, args){
                const instructor = new Instructor({
                    name: args.name,
                    study: args.study,
                    occupation: args.occupation,
                    image: args.image,
                    coursesId: args.coursesId,
                });
                return instructor.save();
            }
        },

        //delete instructor
        deleteInstructor:{
            type: InstructorType,
            args:{
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return Instructor.findByIdAndDelete(args.id);
            }
        },

        //add user
        addUser:{
            type: UserType,
            args:{
                name: {type: GraphQLNonNull(GraphQLString)},
                class: {type: GraphQLString},
                group: {type: GraphQLString},
                image: {type: GraphQLString},
                city: {type: GraphQLString},
                institute: {type: GraphQLString},
                phone: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                coursesId: {type: GraphQLList(GraphQLID)},
            },
            resolve(parent, args){
                const newUser = new User({
                    name: args.name,
                    class: args.class,
                    group: args.group,
                    image: args.image,
                    city: args.city,
                    institute: args.institute,
                    phone: args.phone,
                    email: args.email,
                    password: args.password,
                    coursesId: args.coursesId
                });
                return newUser.save();
            }
        },

        //delete instructor
        deleteUser:{
            type: UserType,
            args:{
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return User.findByIdAndDelete(args.id);
            }
        },
    }
    
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})