import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";

const Register = () => {
  const navigate = useNavigate();
  const { loading, handleRegister } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const res = await handleRegister({ username, email, password });
    if (res.success) {
      navigate("/dashboard");
    } else {
      setError(res.error || "Registration failed. Try a different username/email.");
    }
  };

  if (loading) {
    return (
      <main className="auth-loading">
        <div className="spinner"></div>
        <p>Creating your account...</p>
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
          <h1>Create an Account</h1>
          <p className="auth-subtitle">Get started with your custom interview strategy</p>
        </div>

        {error && <div className="auth-error-alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
            />
          </div>

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
            Register
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
