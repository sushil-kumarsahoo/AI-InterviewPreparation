import { Link } from "react-router";
import Navbar from "../../../components/Navbar";
import "../style/landing.scss";

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
  return (
    <div className="landing-wrapper">
      <Navbar />

      <main className="landing">
        <section className="landing__hero">
          <div className="hero-pill">
            <span className="hero-pill__dot"></span>
            <span>AI-Powered Interview Coach</span>
          </div>

          <h1>
            Crack Your Next Tech Interview with an{" "}
            <span className="gradient-text">AI-Crafted Strategy</span>
          </h1>

          <p>
            Paste the job description, upload your resume, and generate a battle-tested
            preparation road map, custom interview Q&amp;As, and an ATS resume in seconds.
          </p>

          <div className="hero-actions">
            <Link to="/dashboard" className="button primary-button landing__cta">
              Create Your Plan Free
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </section>

        <section id="features" className="landing__features">
          <div className="section-header">
            <h2>Everything You Need to Ace the Interview</h2>
            <p>From skill-gap breakdown to customized model answers</p>
          </div>

          <div className="features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="landing__steps">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Simple 3-step strategy to boost your confidence</p>
          </div>

          <div className="steps-container">
            <div className="step-card">
              <span className="step-num">01</span>
              <h4>Upload &amp; Describe</h4>
              <p>Paste the target job description and upload your resume or write a quick self-description.</p>
            </div>
            <div className="step-card">
              <span className="step-num">02</span>
              <h4>AI Deep Analysis</h4>
              <p>Gemini AI evaluates requirements against your background to score your match and isolate gaps.</p>
            </div>
            <div className="step-card">
              <span className="step-num">03</span>
              <h4>Execute &amp; Win</h4>
              <p>Study the targeted questions, follow your daily road map, and download your tailored resume.</p>
            </div>
          </div>
        </section>

        <footer className="landing__footer">
          <p>&copy; {new Date().getFullYear()} InterviewAI. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default Landing;