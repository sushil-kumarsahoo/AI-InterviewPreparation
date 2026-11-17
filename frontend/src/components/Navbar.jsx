import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import "../styles/navbar.scss";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLogout = async () => {
    setMenuOpen(false);
    await handleLogout();
    navigate("/");
  };

  const initial = user?.username?.charAt(0).toUpperCase() || "U";

  return (
    <header className="navbar">
      <div className="navbar__container">
        {/* Brand Logo */}
        <Link to="/" className="navbar__brand">
          <div className="navbar__logo-icon">
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="navbar__brand-name">
            Interview<span className="navbar__brand-gradient">AI</span>
          </span>
          <span className="navbar__badge">Pro</span>
        </Link>

        {/* Center Navigation */}
        <nav className="navbar__links">
          <Link
            to="/"
            className={`navbar__link ${location.pathname === "/" ? "navbar__link--active" : ""}`}
          >
            Home
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className={`navbar__link ${location.pathname === "/dashboard" ? "navbar__link--active" : ""}`}
            >
              Dashboard
            </Link>
          )}
          {!user && (
            <>
              <a href="#features" className="navbar__link">
                Features
              </a>
              <a href="#how-it-works" className="navbar__link">
                How It Works
              </a>
            </>
          )}
        </nav>

        {/* Right Side Actions / User Profile */}
        <div className="navbar__actions">
          {user ? (
            <div className="navbar__user-menu" ref={menuRef}>
              <button
                className="navbar__user-trigger"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-expanded={menuOpen}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="navbar__avatar-img"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="navbar__avatar-initial">{initial}</div>
                )}
                <span className="navbar__username">{user.username}</span>
                <svg
                  className={`navbar__chevron ${menuOpen ? "navbar__chevron--open" : ""}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {menuOpen && (
                <div className="navbar__dropdown">
                  <div className="navbar__dropdown-header">
                    <p className="navbar__dropdown-user">{user.username}</p>
                    <p className="navbar__dropdown-email">{user.email}</p>
                  </div>

                  <div className="navbar__dropdown-divider" />

                  <Link
                    to="/dashboard"
                    className="navbar__dropdown-item"
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    My Strategies
                  </Link>

                  <div className="navbar__dropdown-divider" />

                  <button
                    className="navbar__dropdown-item navbar__dropdown-item--logout"
                    onClick={onLogout}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar__auth-buttons">
              <Link to="/login" className="navbar__login-btn">
                Log In
              </Link>
              <Link to="/register" className="button primary-button navbar__signup-btn">
                Get Started Free
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
