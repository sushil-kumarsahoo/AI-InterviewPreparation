import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const res = await handleLogin({ email, password });
    if (res.success) {
      navigate("/dashboard");
    } else {
      setError(res.error || "Invalid email or password.");
    }
  };

  if (loading) {
    return (
      <main className="auth-loading">
        <div className="spinner"></div>
        <p>Signing you in...</p>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="form-container">
        <div className="auth-header">
          <Link to="/" className="brand-logo">
            Interview<span className="gradient-text">AI</span>
          </Link>
          <h1>Welcome back</h1>
          <p className="auth-subtitle">Sign in to your account to continue</p>
        </div>

        {error && <div className="auth-error-alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="name@company.com"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="button primary-button submit-btn">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create one now</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
