import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import "../style/user-menu.scss";

const UserMenu = () => {
  const { user, handleLogout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // close the dropdown when clicking outside
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
    <div className="user-menu" ref={menuRef}>
      <button
        className="user-menu__avatar"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {initial}
      </button>

      {open && (
        <div className="user-menu__dropdown" role="menu">
          <p className="user-menu__name">{user?.username}</p>
          <button className="user-menu__logout" onClick={handleLogout} role="menuitem">
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;