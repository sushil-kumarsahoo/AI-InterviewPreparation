const {GoogleGenAI} = require("@google/genai")
const z = require("zod")
//const {zodToJsonSchema} = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

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
    title: z.string().describe("The title of the job for which the interview report is generated")
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
          responseJsonSchema: z.toJSONSchema(interviewReportSchema)
          // responseSchema: interviewReportSchema

       }
   })
     console.log(response.text);
     return JSON.parse(response.text)
}

async function generatePdfFromHtml(htmlContent){

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(htmlContent, { waitUntill: "networkidle2" })

  const pdfBuffer = await page.pdf({ 
    format: "A4",
    printBackground: true,
    margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" }  })

  await browser.close()

  return pdfBuffer
}

async function generateResumePdf({resume, selfDescription, jobDescription}){
   const resumePdfSchema = z.object({
     html: z.string().describe("The HTMl content of the resume which content of the resume which can be converted to PDF using any library like puppeteer")
   })

   const prompt = `You are an experienced resume writer who knows how ATS (Applicant Tracking Systems) read resumes.
Create a one-page resume for the candidate below, tailored to the job description.

CANDIDATE DETAILS
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

CONTENT RULES
- Use ONLY facts found in the resume and self description. Never invent companies, degrees, projects, dates, numbers or skills.
- Use important keywords from the job description, but only where the candidate really has that skill.
- Order of sections: Name and contact, Summary, Skills, Projects, Education, Experience (only if present), Certifications (only if present).
- The content must fit on ONE A4 page. If there is too much, remove the least relevant details first.

WRITING STYLE RULES (it must read like a real person wrote it)
- Write like a fresher or junior developer, not like a marketing brochure.
- Use simple, direct language. Each bullet should be one line, maximum two.
- Vary how bullets begin. Do not start every bullet with a fancy verb.
- Avoid clichés and filler words such as: passionate, results-driven, dynamic, synergy, leveraged, spearheaded, cutting-edge, seamless, robust, proven track record.
- Do not use em dashes, emojis or exaggerated claims.
- Mention concrete details from the candidate's own resume: tech stack, what the feature does, real numbers. If a number is not given, do not invent one.
- The Summary must be 2 plain sentences, without the word "I".

ATS AND LAYOUT RULES
- Single-column layout only. No tables, images, icons, graphics or columns.
- Use standard headings: Summary, Skills, Projects, Education, Experience.
- Use semantic HTML (h1, h2, p, ul, li) and one embedded <style> tag. No external CSS, fonts or scripts.
- Font: font-family: Arial, Helvetica, "Liberation Sans", sans-serif; for all text (one font only).
- Sizes: name 19pt, section headings 12.5pt bold, body text 10pt, line-height 1.3.
- Black text on a white background. Add a thin line under each section heading.
- Include this CSS: @page { size: A4; margin: 12mm; } body { margin: 0; }
- Show links as plain text, for example github.com/username.

OUTPUT FORMAT
Return ONLY a valid JSON object with a single field "html". The value must be the complete HTML document (starting with <!DOCTYPE html>) as one string.`

   const response = await ai.models.generateContent({
       model:"gemini-3-flash-preview",
       contents: prompt,
       config:{
           responseMimeType: "application/json",
           responseSchema: z.toJSONSchema(resumePdfSchema)
       }
   })

   const jsonContent = JSON.parse(response.text)

   const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

   return pdfBuffer
}

module.exports = {generateInterviewReport, generateResumePdf}

