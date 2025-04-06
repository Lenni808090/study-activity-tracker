import Subject from "../components/Subject";
import { BarChart3, Calendar } from "lucide-react"; // Add this import
import { useNavigate } from "react-router-dom"; // Add this import

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-base-100 to-base-300 animate-gradient-x pt-16">
      <div className="container mx-auto px-4 pt-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Your Subjects</h1>
          <div className="flex gap-2">
            <button 
              onClick={() => navigate('/timetable')} 
              className="btn btn-primary gap-2"
            >
              <Calendar className="h-5 w-5" />
              Timetable
            </button>
            <button 
              onClick={() => navigate('/statistics')} 
              className="btn btn-primary gap-2"
            >
              <BarChart3 className="h-5 w-5" />
              Statistics
            </button>
          </div>
        </div>
        <Subject />
      </div>
    </div>
  );
};

export default HomePage;