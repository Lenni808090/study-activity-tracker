import { useAuthStore } from "../store/useAuthStore.js";
import { useThemeStore } from "../store/useThemeStore.js";
import { Link } from "react-router-dom";
import { LogOut, BookOpen, BarChart3, Calendar, BookText, Users, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const themes = [
    "light", "dark", "cupcake", "bumblebee", "emerald", 
    "corporate", "synthwave", "retro", "cyberpunk", "valentine"
  ];

  const navItems = [
    { to: "/homework", icon: <BookText className="size-5 text-primary" />, label: "Homework" },
    { to: "/timetable", icon: <Calendar className="size-5 text-primary" />, label: "Timetable" },
    { to: "/statistics", icon: <BarChart3 className="size-5 text-primary" />, label: "Statistics" },
    { to: "/friends", icon: <Users className="size-5 text-primary" />, label: "Friends" },
  ];

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          >
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">Study Tracker</h1>
          </Link>

          {/* Mobile menu button */}
          <button
            className="lg:hidden btn btn-ghost btn-circle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {authUser && (
              <>
                {navItems.map((item, index) => (
                  <div key={item.to} className="flex items-center">
                    {index > 0 && <div className="h-6 border-r border-base-300 mx-1"></div>}
                    <Link
                      to={item.to}
                      className="flex gap-2 items-center px-3 py-2 rounded-lg border border-transparent hover:border-primary/30 hover:bg-primary/10 transition-all hover:scale-105"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </div>
                ))}
                <div className="h-6 border-r border-base-300 mx-1"></div>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                    <div className="card-body">
                      <span className="font-bold text-lg">Themes</span>
                      <div className="grid grid-cols-2 gap-2">
                        {themes.map((t) => (
                          <button 
                            key={t} 
                            className={`btn btn-sm ${theme === t ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setTheme(t)}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-6 border-r border-base-300 mx-1"></div>
                <button 
                  className="flex gap-2 items-center px-3 py-2 rounded-lg border border-transparent hover:border-error/30 hover:bg-error/10 transition-all hover:scale-105" 
                  onClick={logout}
                >
                  <LogOut className="size-5 text-error" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden fixed inset-0 min-h-screen bg-base-100/95 backdrop-blur-md z-30 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "64px" }}
      >
        <div className="container mx-auto px-4 py-6 h-[calc(100vh-64px)] overflow-y-auto">
          {authUser && (
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-all animate-slide-down"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span className="text-lg">{item.label}</span>
                </Link>
              ))}
              <div className="divider"></div>
              <div className="p-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <span className="font-bold text-lg mb-4 block">Themes</span>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((t) => (
                    <button 
                      key={t} 
                      className={`btn btn-sm ${theme === t ? 'btn-primary' : 'btn-ghost'}`}
                      onClick={() => setTheme(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="divider"></div>
              <button 
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-error/10 text-error transition-all animate-fade-in"
                style={{ animationDelay: "0.5s" }}
                onClick={() => {
                  setIsMenuOpen(false);
                  logout();
                }}
              >
                <LogOut className="size-5" />
                <span className="text-lg">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
