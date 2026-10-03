const {GoogleGenAI} = require("@google/genai")
const z = require("zod")
//const {zodToJsonSchema} = require("zod-to-json-schema")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
    title: z.string().describe("The title of the  job for which interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }){

    const prompt = `You are an interview coach preparing a candidate for a job interview.
Produce a preparation report for the CANDIDATE.

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Return ONLY valid JSON in exactly this structure. Every array item must be an object, never a plain string:

{
  "title": "job title",
  "matchScore": 68,
  "technicalQuestions": [
    { "question": "...", "intention": "why the interviewer asks this", "answer": "how to answer, points to cover" }
  ],
  "behavioralQuestions": [
    { "question": "...", "intention": "...", "answer": "..." }
  ],
  "skillGaps": [
    { "skill": "...", "severity": "low" }
  ],
  "preparationPlan": [
    { "day": 1, "focus": "...", "tasks": ["task 1", "task 2"] }
  ]
}

severity must be "low", "medium" or "high".
Give 5 technical questions, 5 behavioral questions, all real skill gaps, and a 7-day plan.`
   
   const response = await ai.models.generateContent({
       model: "gemini-3-flash-preview",
       contents: prompt,
       config: {
          responseMimeType: "application/json",
          //responseJsonSchema: zodToJsonSchema(interviewReportSchema)

       }
   })
     console.log(response.text);
     return JSON.parse(response.text)
}


module.exports = generateInterviewReport

