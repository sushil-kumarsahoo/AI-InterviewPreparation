const {GoogleGenAI} = require("@google/genai")
const z = require("zod")
const {zodToJsonSchema} = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY
})

const interviewReportSchema = z.object({
matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job description."),  
technicalQuestions: z.array(z.object({
    question: z.string().describe("The technical question can be asked in the interview"),
    intention: z.string().describe("The intention of interviewer behind asking this question"),
    answer: z.string().describe("How to answer this question,what points to cover, what approach to take etc.")
})).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
behavioralQuestions: z.array(z.object({
    question: z.string().describe("The behavioral question can be asked in the interview"),
    intention: z.string().describe("The intention of interviewer behind asking this question"),
    answer: z.string().describe("How to answer this question,what points to cover, what approach to take etc.")
})).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
skillGaps: z.array(z.object({
    skill: z.string().describe("The skill which the candidate is lacking"),
    severity: z.enum(["low", "medium", "high"]).describe("The severity of tjis skill gap")
})).describe("List of skill gaps in the candidate's profile along with their severity"),
prparationPlan: z.array(z.object({
    day: z.number().describe("The day number in the prepartion plan, starting from 1 "),
    focus: z.string().describe("The main focus of this day in the prepartion plan, e.g datastructure, system design, mock interviews "),
    tasks: z.string(z.string()).describe("List of tasks to be done on this day to follow the prepartion plan ")
})).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively")
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }){

    const prompt = `Generate an interview report for a candidate with the following details:
    Resume: ${resume}
    self Description: ${selfDescription}
    job Description: ${jobDescription}`
   
   const response = await ai.models.generateContent({
       model: "gemini-3.5-flash",
       contents: prompt,
       config: {
          responseMimeType: "application/json",
          responseJsonSchema: zodToJsonSchema(interviewReportSchema)
       }
   })
   console.log(JSON.parse(response.text));
   
}


module.exports = generateInterviewReport

