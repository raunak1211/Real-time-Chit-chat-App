import { MessageSquare, LogOut, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";
import { useAuthStore } from "../stores/authStore";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group transition-all hover:opacity-90"
        >
          <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20">
            <MessageSquare className="size-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold">ChatApp</h1>
        </Link>

        {/* Right: User actions */}
        <div className="flex items-center gap-2">
          <Link to="/settings" className="btn btn-sm btn-ghost gap-2">
            <Settings className="size-5" />
            <span className="hidden md:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link to="/profile" className="btn btn-sm btn-ghost gap-2">
                <User className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={logout}
                className="btn btn-sm btn-ghost gap-2"
              >
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
