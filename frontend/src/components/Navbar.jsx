import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import "../styles/navbar.scss";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setMobileMenuOpen(false);
  }

  // Close on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const onLogout = async () => {
    setMobileMenuOpen(false);
    await handleLogout();
    navigate("/");
  };

  const scrollToSection = (e, targetId) => {
    setMobileMenuOpen(false);
    if (location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const initial = user?.username?.charAt(0).toUpperCase() || "U";

  return (
    <header className="navbar">
      <div className="navbar__container">
        {/* Brand Logo - Left End */}
        <Link
          to="/"
          className="navbar__brand"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="navbar__logo-icon">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
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
        </Link>

        {/* Desktop Navigation Links - Center */}
        <nav className="navbar__links navbar__links--desktop">
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
              <a
                href="/#features"
                className="navbar__link"
                onClick={(e) => scrollToSection(e, "features")}
              >
                Features
              </a>
              <a
                href="/#how-it-works"
                className="navbar__link"
                onClick={(e) => scrollToSection(e, "how-it-works")}
              >
                How It Works
              </a>
            </>
          )}
        </nav>

        {/* Right End - Actions */}
        <div className="navbar__actions">
          {user ? (
            <div className="navbar__user-section">
              <div className="navbar__user-badge" title={user.email || user.username}>
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
              </div>

              <button
                type="button"
                className="navbar__logout-btn"
                onClick={onLogout}
                title="Sign Out"
                aria-label="Logout"
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
                <span className="navbar__logout-text">Logout</span>
              </button>
            </div>
          ) : (
            <div className="navbar__auth-buttons navbar__auth-buttons--desktop">
              <Link to="/login" className="navbar__login-btn">
                Log In
              </Link>
              <Link to="/register" className="button primary-button navbar__signup-btn">
                Get Started Free
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className={`navbar__hamburger ${mobileMenuOpen ? "navbar__hamburger--open" : ""}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="navbar__hamburger-line"></span>
            <span className="navbar__hamburger-line"></span>
            <span className="navbar__hamburger-line"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="navbar__mobile-menu">
          {user && (
            <div className="navbar__mobile-user-card">
              <div className="navbar__avatar-initial">{initial}</div>
              <div className="navbar__mobile-user-info">
                <span className="navbar__mobile-username">{user.username}</span>
                {user.email && (
                  <span className="navbar__mobile-email">{user.email}</span>
                )}
              </div>
            </div>
          )}

          <div className="navbar__mobile-links">
            <Link
              to="/"
              className={`navbar__mobile-link ${location.pathname === "/" ? "navbar__mobile-link--active" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Home
            </Link>

            {user && (
              <Link
                to="/dashboard"
                className={`navbar__mobile-link ${location.pathname === "/dashboard" ? "navbar__mobile-link--active" : ""}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                Dashboard
              </Link>
            )}

            {!user && (
              <>
                <a
                  href="/#features"
                  className="navbar__mobile-link"
                  onClick={(e) => scrollToSection(e, "features")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  Features
                </a>
                <a
                  href="/#how-it-works"
                  className="navbar__mobile-link"
                  onClick={(e) => scrollToSection(e, "how-it-works")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  How It Works
                </a>
              </>
            )}
          </div>

          <div className="navbar__mobile-divider"></div>

          <div className="navbar__mobile-actions">
            {user ? (
              <button
                type="button"
                className="navbar__mobile-logout-btn"
                onClick={onLogout}
              >
                <svg
                  width="18"
                  height="18"
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
            ) : (
              <div className="navbar__mobile-auth-btns">
                <Link
                  to="/login"
                  className="navbar__mobile-login-btn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="button primary-button navbar__mobile-signup-btn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
