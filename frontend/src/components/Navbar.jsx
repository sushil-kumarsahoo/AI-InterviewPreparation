import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const onLogout = async () => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    navigate("/", { replace: true });
    await handleLogout();
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
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/85 dark:bg-[#090d16]/85 border-b border-slate-200 dark:border-white/10 transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-17 flex items-center justify-between">
        
        {/* Brand Logo - Left End */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-slate-900 dark:text-white shrink-0 group hover:opacity-95 transition-opacity"
          onClick={() => {
            setMobileMenuOpen(false);
            setUserMenuOpen(false);
          }}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
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
          <span className="font-heading text-lg sm:text-xl font-bold tracking-tight">
            Interview<span className="gradient-text">Forge</span>
          </span>
        </Link>

        {/* Desktop Navigation Links - Center */}
        <nav className="hidden md:flex items-center gap-1.5">
          <Link
            to="/"
            className={`text-sm font-medium px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
              location.pathname === "/"
                ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 font-semibold border border-indigo-200 dark:border-indigo-800/60 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
            }`}
          >
            Home
          </Link>

          {user && (
            <Link
              to="/dashboard"
              className={`text-sm font-medium px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                location.pathname === "/dashboard"
                  ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 font-semibold border border-indigo-200 dark:border-indigo-800/60 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
            >
              Dashboard
            </Link>
          )}

          {!user && (
            <>
              <a
                href="/#features"
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 px-3.5 py-1.5 rounded-lg transition-colors"
                onClick={(e) => scrollToSection(e, "features")}
              >
                Features
              </a>
              <a
                href="/#how-it-works"
                className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 px-3.5 py-1.5 rounded-lg transition-colors"
                onClick={(e) => scrollToSection(e, "how-it-works")}
              >
                How It Works
              </a>
            </>
          )}
        </nav>

        {/* Right End - Actions (Theme Toggle & User Profile Icon with stylish dropdown) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Light / Dark Mode Toggle Button (always shown) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-white/10 transition-all duration-200 focus:outline-none cursor-pointer"
            title={isDark ? "Switch to Light Mode" : "Switch to Night Mode"}
            aria-label="Toggle color theme"
          >
            {isDark ? (
              // Sun Icon for Night Mode
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              // Moon Icon for Light Mode
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* User Profile Section with Stylish Click Dropdown */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              {/* Profile Avatar Button */}
              <button
                type="button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 p-1 rounded-full sm:rounded-xl sm:px-2.5 sm:py-1.5 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-white/10 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                aria-label="User Profile Menu"
                aria-expanded={userMenuOpen}
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-7 h-7 rounded-full object-cover border border-indigo-500 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-heading font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                    {initial}
                  </div>
                )}
                <span className="hidden md:inline-block text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                  {user.username}
                </span>
                <svg
                  className={`hidden md:inline-block text-slate-400 dark:text-slate-500 transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* Stylish Profile Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 sm:w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-3.5 flex flex-col gap-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  
                  {/* User Profile Header */}
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-heading font-bold text-sm flex items-center justify-center shrink-0 shadow-sm shadow-indigo-500/20">
                        {initial}
                      </div>
                    )}
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-bold font-heading text-slate-900 dark:text-white truncate">
                        {user.username}
                      </span>
                      {user.email && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Navigation Links inside Dropdown */}
                  <div className="flex flex-col gap-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                        location.pathname === "/dashboard"
                          ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                      Dashboard
                    </Link>
                    <Link
                      to="/"
                      onClick={() => setUserMenuOpen(false)}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                        location.pathname === "/"
                          ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      Home Page
                    </Link>
                  </div>

                  <div className="h-px bg-slate-200 dark:bg-slate-800 my-0.5" />

                  {/* Stylish Sign Out Button */}
                  <button
                    type="button"
                    onClick={onLogout}
                    className="flex items-center justify-center gap-2 w-full p-2.5 text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 border border-rose-200 dark:border-rose-900/50 rounded-xl transition-all cursor-pointer shadow-xs active:scale-98"
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
            <>
              {/* Desktop Auth Buttons (Logged Out) */}
              <div className="hidden md:flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-3.5 py-1.5 rounded-lg transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="primary-button text-xs py-2 px-3.5 rounded-lg"
                >
                  Get Started Free
                </Link>
              </div>

              {/* Mobile Hamburger Button (Only when Logged Out) */}
              <button
                type="button"
                className="md:hidden flex flex-col justify-center items-center gap-1.25 w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <span
                  className={`w-4 h-0.5 bg-current rounded-full transition-all duration-200 ${
                    mobileMenuOpen ? "transform rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`w-4 h-0.5 bg-current rounded-full transition-all duration-200 ${
                    mobileMenuOpen ? "opacity-0 scale-0" : ""
                  }`}
                />
                <span
                  className={`w-4 h-0.5 bg-current rounded-full transition-all duration-200 ${
                    mobileMenuOpen ? "transform -rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Drawer Dropdown (Only for Logged Out Visitors) */}
      {!user && mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 shadow-2xl p-4 flex flex-col gap-3 z-50">
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === "/"
                  ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 font-semibold"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Home
            </Link>

            <a
              href="/#features"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
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
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              onClick={(e) => scrollToSection(e, "how-it-works")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              How It Works
            </a>
          </div>

          <div className="h-px bg-slate-200 dark:bg-white/10 my-1" />

          <div className="flex flex-col gap-2 pt-1">
            <Link
              to="/login"
              className="flex items-center justify-center w-full p-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="primary-button w-full justify-center p-2.5 text-sm rounded-xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
