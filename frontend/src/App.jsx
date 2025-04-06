import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUpPage from "./pages/SignUpPage"; 
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TimerPage from "./pages/TimerPage";
import StatisticsPage from "./pages/StatisticsPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";
import Timetable from "./components/Timetable";

// Fügen Sie den Import für die neue Seite hinzu
import HomeworkPage from "./pages/HomeworkPage";

function App() {
  const { theme } = useThemeStore();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if(isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/timer/:subjectId" element={authUser ? <TimerPage /> : <Navigate to="/login" />} />
        <Route path="/statistics" element={authUser ? <StatisticsPage />: <Navigate to="/login" />} /> 
        <Route path="/timetable" element={authUser ? <Timetable />: <Navigate to="/login" />} /> 
        // Fügen Sie die neue Route hinzu (innerhalb Ihrer Routes-Komponente)
        <Route path="/homework" element={authUser ? <HomeworkPage />: <Navigate to="/login" />} />
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{ 
          duration: 3000,
          style: { background: "black", color: 'white' }
        }}
      />
    </div>
  );
};

export default App;