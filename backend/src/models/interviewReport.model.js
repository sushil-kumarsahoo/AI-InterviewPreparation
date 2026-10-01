const mongoose = require("mongoose");

/**
 * - job description schema: String
 * - resume text: String
 * - self description: String
 *
 * -matchScore: Number
 *
 * - Technical questions :
 *    [{
 *      questionm: "",
 *      intention: "",
 *      answer: ""
 *    }]
 * - behavioural questions : 
 *  [{
 *      questionm: "",
 *      intention: "",
 *      answer: ""
 *    }]
 * - skill gaps : [{
 *                skill: "",
 *                severity: {
 *                      type: String
 *                      enum: ["hard", "medium", "high"]
 *                         }
 *                  }]
 * - preparation plan : [{
 *                  day: Number,
 *                  focus: String,
 *                  tasks: [String]
 *              }]
 */

const technicalQuestionsSchema = new mongoose({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
})

const behavioralQuestionsSchema = new mongoose({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, {
    _id: false
})

const skillGapSchema = new mongoose({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    }
}, {
    _id: false
})

const prepartionPlanSchema = new mongoose({
   day:{
    type: Number,
    required: [true, "Day is required"]
   },
   focus: {
    type: String,
    required: [true, "Focus is required"]
   },
   tasks:[{
    type: String,
    required: [true, "Task is required"]
   }]
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "job description required"]
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestions: [technicalQuestionsSchema],
    behavioralQuestions: [behavioralQuestionsSchema],
    skillGaps: [skillGapSchema],
    prepartionPlan: [prepartionPlanSchema]
},{
    timestamps: true
})


const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel;