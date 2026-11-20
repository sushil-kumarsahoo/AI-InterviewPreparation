import { Link } from "react-router";
import Navbar from "../../../components/Navbar";
import { useAuth } from "../../auth/hooks/useAuth";

const FEATURES = [
  {
    title: "Instant Match Score",
    text: "See how well your background aligns with job expectations and pinpoint where you shine.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Targeted Questions & Answers",
    text: "Practice technical and behavioral questions tailored directly to your target role with model answers.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Day-by-Day Road Map",
    text: "Follow a tailored day-wise preparation plan designed to bridge critical skill gaps before interview day.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
  {
    title: "ATS-Optimized Resume",
    text: "Download a beautifully formatted, single-page PDF resume custom-tailored to the target job description.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

const Landing = () => {
  const { user } = useAuth();
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-200 overflow-x-hidden">
      
      {/* ── Crafted Blueprint Background: Grid + Dots + Radiant Ambient Glows ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Ambient Top Glow Aura */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] sm:w-[950px] h-[400px] sm:h-[550px] bg-gradient-to-b from-indigo-500/15 via-purple-500/10 to-transparent dark:from-indigo-600/25 dark:via-purple-600/15 dark:to-transparent rounded-full blur-3xl opacity-80" />
        
        {/* Side Accent Auras */}
        <div className="absolute top-1/4 -left-36 w-80 h-80 bg-cyan-400/10 dark:bg-cyan-500/15 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-2/3 -right-36 w-80 h-80 bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl opacity-60" />

        {/* Blueprint Precision Grid Layer with Mask Vignette */}
        <div className="absolute inset-0 bg-craft-grid opacity-75 dark:opacity-60 mask-radial-vignette" />
        
        {/* Precision Matrix Dots Layer */}
        <div className="absolute inset-0 bg-craft-dots opacity-60 dark:opacity-45 mask-radial-vignette" />
      </div>

      {/* Navigation */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex flex-col gap-16 sm:gap-24">
        
        {/* ── Hero Section ── */}
        <section className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto pt-4 sm:pt-10">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 text-indigo-700 border border-indigo-200/90 shadow-xs hover:border-indigo-300 dark:bg-indigo-950/70 dark:text-cyan-300 dark:border-cyan-500/30 dark:shadow-[0_0_15px_rgba(6,182,212,0.15)] text-xs font-semibold backdrop-blur-xs transition-all">
            <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
            <span>AI-Powered Interview Coach</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-heading leading-tight text-slate-900 dark:text-white">
            Crack Your Next Tech Interview with an{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-300 dark:to-cyan-300 bg-clip-text text-transparent">
              AI-Crafted Strategy
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
            Paste the job description, upload your resume, and generate a battle-tested
            preparation road map, custom interview Q&amp;As, and an ATS resume in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
            <Link
              to={user ? "/dashboard" : "/login"}
              className="primary-button text-base px-8 py-3.5 rounded-xl shadow-lg hover:shadow-indigo-500/25 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Create Your Plan Free
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </section>

        {/* ── Features Section ── */}
        <section id="features" className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              Everything You Need to Ace the Interview
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-cyan-400/80">
              From skill-gap breakdown to customized model answers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl bg-white/85 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/80 shadow-sm hover:shadow-xl dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:border-indigo-400 dark:hover:border-cyan-500/50 hover:bg-white dark:hover:bg-slate-900 transition-all duration-200 flex flex-col gap-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white dark:bg-slate-800/90 dark:text-cyan-400 dark:border-slate-700/80 group-hover:dark:bg-cyan-500/20 group-hover:dark:text-cyan-300 group-hover:dark:border-cyan-500/40 group-hover:dark:shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center transition-all">
                  {f.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-indigo-700 group-hover:dark:text-cyan-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How It Works Section ── */}
        <section id="how-it-works" className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-cyan-400/80">
              Simple 3-step strategy to boost your confidence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/85 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/80 shadow-sm hover:shadow-xl dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:border-indigo-400 dark:hover:border-cyan-500/50 transition-all duration-200 flex flex-col gap-3 group">
              <span className="font-heading font-extrabold text-3xl bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent">
                01
              </span>
              <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-indigo-700 group-hover:dark:text-cyan-300 transition-colors">
                Upload &amp; Describe
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Paste the target job description and upload your resume or write a quick self-description.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/85 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/80 shadow-sm hover:shadow-xl dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all duration-200 flex flex-col gap-3 group">
              <span className="font-heading font-extrabold text-3xl bg-gradient-to-br from-purple-600 to-pink-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                02
              </span>
              <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-indigo-700 group-hover:dark:text-indigo-300 transition-colors">
                AI Deep Analysis
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Gemini AI evaluates requirements against your background to score your match and isolate gaps.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/85 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/80 shadow-sm hover:shadow-xl dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:border-indigo-400 dark:hover:border-purple-500/50 transition-all duration-200 flex flex-col gap-3 group">
              <span className="font-heading font-extrabold text-3xl bg-gradient-to-br from-cyan-600 to-indigo-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                03
              </span>
              <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-slate-100 group-hover:text-indigo-700 group-hover:dark:text-purple-300 transition-colors">
                Execute &amp; Win
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Study the targeted questions, follow your daily road map, and download your tailored resume.
              </p>
            </div>
          </div>
        </section>

        {/* ── Landing Footer ── */}
        <footer className="text-center text-xs text-slate-500 dark:text-slate-500 pt-8 pb-4 border-t border-slate-200 dark:border-slate-800">
          <p>&copy; {new Date().getFullYear()} InterviewAI. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Landing;
