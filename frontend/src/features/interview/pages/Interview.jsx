import { useState, useEffect } from "react";
import { useInterview } from "../hook/useInterview";
import { useParams, Link } from "react-router";
import Navbar from "../../../components/Navbar";

const NAV_ITEMS = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Road Map",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

// ── Question Card Accordion ──
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-200 shadow-xs">
      <button
        type="button"
        className="w-full p-4 sm:p-5 flex items-start justify-between gap-3 text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-start gap-3">
          <span className="shrink-0 text-xs font-bold px-2 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/60 font-mono">
            Q{index + 1}
          </span>
          <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 leading-snug">
            {item.question}
          </p>
        </div>
        <span
          className={`shrink-0 p-1 rounded-lg text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
            open ? "transform rotate-180 text-indigo-600 dark:text-indigo-400" : ""
          }`}
        >
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
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="p-4 sm:p-5 pt-0 flex flex-col gap-3.5 border-t border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/30">
          <div className="flex flex-col gap-1.5 p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <span className="inline-flex self-start text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400">
              Interviewer Intention
            </span>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.intention}
            </p>
          </div>

          <div className="flex flex-col gap-1.5 p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <span className="inline-flex self-start text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400">
              Model Answer
            </span>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Road Map Day Component ──
const RoadMapDay = ({ day }) => (
  <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col gap-3 shadow-xs">
    <div className="flex items-center gap-3">
      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-heading">
        Day {day.day}
      </span>
      <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 dark:text-white">
        {day.focus}
      </h3>
    </div>
    <ul className="flex flex-col gap-2 pl-1">
      {day.tasks.map((task, i) => (
        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
          <span className="leading-relaxed">{task}</span>
        </li>
      ))}
    </ul>
  </div>
);

// ── Main Component ──
const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId, getReportById]);

  const handleDownload = async () => {
    setDownloadingPdf(true);
    try {
      await getResumePdf(interviewId);
    } finally {
      setDownloadingPdf(false);
    }
  };

  if (loading && !report) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
          <div className="btn-spinner !w-10 !h-10 !border-indigo-600 !border-t-transparent dark:!border-indigo-400" />
          <h1 className="text-lg font-semibold font-heading text-slate-700 dark:text-slate-300">
            Loading your interview plan...
          </h1>
        </main>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <h1 className="text-xl font-bold font-heading text-slate-800 dark:text-slate-200">
            Interview report not found.
          </h1>
          <Link to="/dashboard" className="primary-button text-sm py-2 px-5 rounded-xl">
            Return to Dashboard
          </Link>
        </main>
      </div>
    );
  }

  // Score styling logic
  const isHigh = report.matchScore >= 80;
  const isMid = report.matchScore >= 60 && !isHigh;

  const scoreRingBorder = isHigh
    ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40"
    : isMid
      ? "border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40"
      : "border-rose-500 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40";

  const scoreBadgeColor = isHigh
    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800"
    : isMid
      ? "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-400 border-amber-300 dark:border-amber-800"
      : "bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-400 border-rose-300 dark:border-rose-800";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6">
        
        {/* Header Breadcrumb Bar */}
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Dashboard
          </Link>
          <span className="text-slate-400 dark:text-slate-600">/</span>
          <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-sm sm:max-w-md">
            {report.title || "Interview Strategy"}
          </span>
        </div>

        {/* ── Top Match Score & Question Types Banner (ALWAYS AT TOP) ── */}
        <section className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Score Ring Display */}
            <div className={`w-20 h-20 sm:w-22 sm:h-22 rounded-full border-4 flex flex-col items-center justify-center font-heading font-black shadow-inner shrink-0 ${scoreRingBorder}`}>
              <span className="text-2xl sm:text-3xl leading-none">{report.matchScore}</span>
              <span className="text-xs font-bold">%</span>
            </div>

            {/* Score Heading & Description */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Match Score
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${scoreBadgeColor}`}>
                  {isHigh
                    ? "Strong Match"
                    : isMid
                      ? "Good Potential"
                      : "Focus on Skill Gaps"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
                {isHigh
                  ? "Strong match for this role based on your profile and skills."
                  : isMid
                    ? "Good potential with targeted preparation on key areas."
                    : "Prioritize practicing the recommended questions to close skill gaps."}
              </p>
            </div>
          </div>

          {/* Quick Question Types Selectors (Technical, Behavioral, Road Map) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full lg:w-auto">
            <button
              type="button"
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
                activeNav === "technical"
                  ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-600 shadow-sm ring-1 ring-indigo-400/40"
                  : "bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
              onClick={() => setActiveNav("technical")}
            >
              <span className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {report.technicalQuestions?.length || 0} Questions
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">Technical</span>
              </div>
            </button>

            <button
              type="button"
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
                activeNav === "behavioral"
                  ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-600 shadow-sm ring-1 ring-indigo-400/40"
                  : "bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
              onClick={() => setActiveNav("behavioral")}
            >
              <span className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-400 shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {report.behavioralQuestions?.length || 0} Questions
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">Behavioral</span>
              </div>
            </button>

            <button
              type="button"
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
                activeNav === "roadmap"
                  ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-600 shadow-sm ring-1 ring-indigo-400/40"
                  : "bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
              onClick={() => setActiveNav("roadmap")}
            >
              <span className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/60 text-cyan-600 dark:text-cyan-400 shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
              </span>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {report.preparationPlan?.length || 0}-Day Plan
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">Road Map</span>
              </div>
            </button>
          </div>
        </section>

        {/* ── Main Content Layout (Left Nav + Center Content + Right Sidebar) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Navigation Column */}
          <nav className="lg:col-span-3 flex flex-col gap-3">
            <div className="flex flex-col gap-1.5 p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-2">
                Sections
              </span>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                    activeNav === item.id
                      ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 font-semibold border border-indigo-200 dark:border-indigo-800/60 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  }`}
                  onClick={() => setActiveNav(item.id)}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>

            {/* Download ATS-Optimized Resume Button */}
            <button
              onClick={handleDownload}
              className="primary-button w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold shadow-md flex items-center justify-center gap-2"
              disabled={downloadingPdf}
            >
              {downloadingPdf ? (
                <>
                  <div className="btn-spinner" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <svg
                    height="16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
                  </svg>
                  Download Tailored Resume
                </>
              )}
            </button>
          </nav>

          {/* Center Content Column */}
          <main className="lg:col-span-6 flex flex-col gap-4">
            {activeNav === "technical" && (
              <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                    Technical Questions
                  </h2>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {report.technicalQuestions?.length || 0} questions
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {report.technicalQuestions?.map((q, i) => (
                    <QuestionCard key={i} item={q} index={i} />
                  ))}
                </div>
              </section>
            )}

            {activeNav === "behavioral" && (
              <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                    Behavioral Questions
                  </h2>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {report.behavioralQuestions?.length || 0} questions
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {report.behavioralQuestions?.map((q, i) => (
                    <QuestionCard key={i} item={q} index={i} />
                  ))}
                </div>
              </section>
            )}

            {activeNav === "roadmap" && (
              <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                    Preparation Road Map
                  </h2>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {report.preparationPlan?.length || 0}-day plan
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {report.preparationPlan?.map((day) => (
                    <RoadMapDay key={day.day} day={day} />
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* Right Column - Identified Skill Gaps Sidebar */}
          <aside className="lg:col-span-3 flex flex-col gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Identified Skill Gaps
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Areas flagged by AI where extra preparation will maximize interview success:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {report.skillGaps?.map((gap, i) => {
                  const severityClass =
                    gap.severity === "high"
                      ? "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-900/60"
                      : gap.severity === "medium"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-900/60"
                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/60";

                  return (
                    <span
                      key={i}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${severityClass}`}
                    >
                      {gap.skill}
                    </span>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Interview;
