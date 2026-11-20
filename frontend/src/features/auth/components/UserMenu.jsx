import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const UserMenu = () => {
  const { user, handleLogout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initial = user?.username?.charAt(0).toUpperCase() || "U";

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        type="button"
        className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center cursor-pointer shadow-xs hover:opacity-90 transition-opacity"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {initial}
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-1.5 flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
          role="menu"
        >
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 px-3 py-2 truncate border-b border-slate-100 dark:border-slate-800">
            {user?.username}
          </p>
          <button
            type="button"
            className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
            onClick={handleLogout}
            role="menuitem"
          >
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
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
