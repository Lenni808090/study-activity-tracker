import { Book } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeworkItem = ({ homework }) => {
  const navigate = useNavigate();

  const navigateToSubjectTimer = () => {
    navigate(`/timer/${homework.subjectId}`);
  };

  return (
    <div
      onClick={navigateToSubjectTimer}
      className="p-4 bg-base-200 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer hover:bg-base-300"
    >
      <div className="flex items-start gap-3">
        <Book className="h-5 w-5 mt-1 text-primary" />
        <div className="flex-1">
          <h3 className="font-medium">{homework.text}</h3>
          <p className="text-sm opacity-70">Subject: {homework.subjectName}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeworkItem;