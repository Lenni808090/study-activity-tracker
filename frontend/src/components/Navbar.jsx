import { useAuthStore } from "../store/useAuthStore.js";
import { useThemeStore } from "../store/useThemeStore.js";
import { Link } from "react-router-dom";
import { LogOut, BookOpen, BarChart3, Calendar, BookText } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

  const themes = [
    "light", "dark", "cupcake", "bumblebee", "emerald", 
    "corporate", "synthwave", "retro", "cyberpunk", "valentine"
  ];

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Study Tracker</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {authUser && (
              <>
                <Link
                  to="/homework"
                  className="flex gap-2 items-center px-3 py-2 rounded-lg border border-transparent hover:border-primary/30 hover:bg-primary/10 transition-all"
                >
                  <BookText className="size-5 text-primary" />
                  <span className="hidden sm:inline">Homework</span>
                </Link>
                <div className="h-6 border-r border-base-300 mx-1"></div>
                <Link
                  to="/timetable"
                  className="flex gap-2 items-center px-3 py-2 rounded-lg border border-transparent hover:border-primary/30 hover:bg-primary/10 transition-all"
                >
                  <Calendar className="size-5 text-primary" />
                  <span className="hidden sm:inline">Timetable</span>
                </Link>
                <div className="h-6 border-r border-base-300 mx-1"></div>
                <Link
                  to="/statistics"
                  className="flex gap-2 items-center px-3 py-2 rounded-lg border border-transparent hover:border-primary/30 hover:bg-primary/10 transition-all"
                >
                  <BarChart3 className="size-5 text-primary" />
                  <span className="hidden sm:inline">Statistics</span>
                </Link>
                <div className="h-6 border-r border-base-300 mx-1"></div>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-primary/10">
                    <div className="indicator">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
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
                <button className="flex gap-2 items-center px-3 py-2 rounded-lg border border-transparent hover:border-error/30 hover:bg-error/10 transition-all" onClick={logout}>
                  <LogOut className="size-5 text-error" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
