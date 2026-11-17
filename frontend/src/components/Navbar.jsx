import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import "../styles/navbar.scss";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = async () => {
    await handleLogout();
    navigate("/");
  };

  const scrollToSection = (e, targetId) => {
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
        </Link>

        {/* Navigation Links - Center */}
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

        {/* Right End - Actions & Direct Logout */}
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
                <span>Logout</span>
              </button>
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
