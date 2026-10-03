import { Link } from "react-router";
import "../style/landing.scss";

const FEATURES = [
  {
    title: "Match Score",
    text: "See how well your profile fits the job description, in percent.",
  },
  {
    title: "Interview Questions",
    text: "Get technical and behavioral questions with model answers.",
  },
  {
    title: "Preparation Road Map",
    text: "Follow a day-by-day plan to close your skill gaps.",
  },
  {
    title: "Resume Download",
    text: "Download a resume tailored to the job you are targeting.",
  },
];

const Landing = () => {
  return (
    <div className="landing">
      <nav className="landing__nav">
        <span className="landing__logo">
          Interview<span className="highlight">AI</span>
        </span>
        <Link to="/login" className="landing__login">Login</Link>
      </nav>

      <section className="landing__hero">
        <h1>
          Crack Your Next Interview with an <span className="accent">AI-Powered Plan</span>
        </h1>
        <p>
          Paste a job description, upload your resume, and get a personalized
          strategy in about 30 seconds.
        </p>
        <Link to="/home" className="button primary-button landing__cta">
          Get Started
        </Link>
      </section>

      <section className="landing__features">
        {FEATURES.map((f) => (
          <div key={f.title} className="feature-card">
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </section>

      <section className="landing__steps">
        <h2>How it works</h2>
        <ol>
          <li>Create an account and log in.</li>
          <li>Add the job description and your resume.</li>
          <li>Receive your questions, skill gaps, and road map.</li>
        </ol>
      </section>

      <footer className="landing__footer">
        <p>&copy; {new Date().getFullYear()} InterviewAI</p>
      </footer>
    </div>
  );
};

export default Landing;