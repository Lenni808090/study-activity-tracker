import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

const SubjectItem = ({ subject }) => {
  const navigate = useNavigate();

  const navigateToTimer = () => {
    navigate(`/timer/${subject._id}`);
  };

  return (
    <div
      onClick={navigateToTimer}
      style={{ borderColor: subject.color }}
      className="flex items-center justify-between p-4 rounded-lg bg-base-100 shadow-md hover:shadow-lg cursor-pointer hover:bg-opacity-90 border-2 transition-all"
    >
      <div className="flex items-start gap-3">
        <BookOpen style={{ color: subject.color }} className="h-5 w-5 mt-1" />
        <div className="flex flex-col">
          <span className="font-semibold">{subject.name}</span>
          <span className="text-sm opacity-70">
            Study time: {Math.floor(subject.studyDuration / (60 * 60 * 1000))}h{" "}
            {Math.floor((subject.studyDuration / (60 * 1000)) % 60)}m{" "}
            {Math.floor((subject.studyDuration / 1000) % 60)}s
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubjectItem;