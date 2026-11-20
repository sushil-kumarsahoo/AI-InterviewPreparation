import { useState, useRef, useEffect } from "react";
import { useInterview } from "../hook/useInterview";
import { useNavigate } from "react-router";
import Navbar from "../../../components/Navbar";

const Home = () => {
  const { loading, generateReport, reports, getReports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    getReports();
  }, [getReports]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
    } else {
      setResumeFileName("");
    }
  };

  const handleGenerateReport = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter a target job description.");
      return;
    }
    const resumeFile = resumeInputRef.current?.files?.[0];
    if (!resumeFile && !selfDescription.trim()) {
      alert("Please upload a resume or provide a quick self-description.");
      return;
    }
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    if (data?._id) {
      navigate(`/interview/${data._id}`);
    } else {
      alert("Failed to generate report. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col gap-8 sm:gap-10">
        
        {/* Page Header */}
        <header className="text-center flex flex-col items-center gap-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading text-slate-900 dark:text-white">
            Create Your Custom <span className="highlight">Interview Strategy</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Let our AI evaluate the job requirements against your unique background to build a winning plan.
          </p>
        </header>

        {/* ── Main Input Box for Job Description & Resume (Always Top) ── */}
        <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
            
            {/* Left Panel - Job Description */}
            <div className="p-5 sm:p-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </span>
                  <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-white">
                    Target Job Description
                  </h2>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60">
                  Required
                </span>
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full h-64 sm:h-80 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all resize-none leading-relaxed"
                  placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                  maxLength={5000}
                />
                <span className="text-xs text-slate-400 dark:text-slate-500 text-right">
                  {jobDescription.length} / 5000 chars
                </span>
              </div>
            </div>

            {/* Right Panel - Profile & Resume */}
            <div className="p-5 sm:p-7 flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <h2 className="text-base sm:text-lg font-bold font-heading text-slate-900 dark:text-white">
                  Your Profile
                </h2>
              </div>

              {/* Upload Resume */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Upload Resume
                  </label>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60">
                    Recommended
                  </span>
                </div>

                <label
                  htmlFor="resume"
                  className="flex flex-col items-center justify-center p-5 sm:p-6 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 bg-slate-50/70 dark:bg-slate-950/40 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 cursor-pointer transition-all duration-200 text-center group"
                >
                  <span className="p-3 rounded-full bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs mb-2 group-hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="16 16 12 12 8 16" />
                      <line x1="12" y1="12" x2="12" y2="21" />
                      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                    </svg>
                  </span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {resumeFileName ? resumeFileName : "Click to upload or drag & drop"}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {resumeFileName ? "File attached (click to replace)" : "PDF document (Max 3MB)"}
                  </p>
                  <input
                    ref={resumeInputRef}
                    onChange={handleFileChange}
                    hidden
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                  />
                </label>
              </div>

              {/* OR Divider */}
              <div className="relative flex items-center justify-center my-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <span className="relative px-3 bg-white dark:bg-slate-900 text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
                  OR
                </span>
              </div>

              {/* Quick Self-Description */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="selfDescription"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Quick Self-Description
                </label>
                <textarea
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  id="selfDescription"
                  name="selfDescription"
                  className="w-full h-24 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all resize-none"
                  placeholder="Briefly describe your experience, key skills, and years in the industry..."
                />
              </div>

              {/* Info Note Box */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="shrink-0 mt-0.5 text-indigo-600 dark:text-indigo-400"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <p>
                  Provide a <strong>Resume</strong> or a <strong>Self Description</strong> for tailored AI evaluation.
                </p>
              </div>
            </div>
          </div>

          {/* Card Footer with Generate Button */}
          <div className="p-4 sm:px-7 sm:py-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
              Powered by Gemini 2.5 Flash &bull; Instant Analysis
            </span>
            <button
              onClick={handleGenerateReport}
              className="primary-button w-full sm:w-auto text-sm py-2.5 px-6 rounded-xl cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="btn-spinner" />
                  Generating Strategy...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                  </svg>
                  Generate My Interview Strategy
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Generated Paths Down Below ── */}
        {reports.length > 0 && (
          <section className="flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white">
              Generated Preparation Paths ({reports.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report) => {
                const scoreColor =
                  report.matchScore >= 80
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60"
                    : report.matchScore >= 60
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800/60"
                      : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800/60";

                return (
                  <div
                    key={report._id}
                    onClick={() => navigate(`/interview/${report._id}`)}
                    className="group p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-heading font-semibold text-base text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {report.title || "Untitled Position"}
                      </h3>
                      <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${scoreColor}`}>
                        {report.matchScore}% Match
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                      <span>Generated on {new Date(report.createdAt).toLocaleDateString()}</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        View Plan &rarr;
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Page Footer */}
        <footer className="text-center text-xs text-slate-500 dark:text-slate-500 pt-4 pb-2 border-t border-slate-200 dark:border-slate-800/60">
          <p>&copy; {new Date().getFullYear()} InterviewAI. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
