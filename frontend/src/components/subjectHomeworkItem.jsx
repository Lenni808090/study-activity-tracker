import { Book, Check } from "lucide-react";
import { useHomeworkStore } from "../store/useHomeworkStore";

const HomeworkItem = ({ homework }) => {
  const { completeHomework } = useHomeworkStore();
  
  const handleComplete = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking the complete button
    completeHomework({ 
      homeworkId: homework.homeworkId,
      subjectId: homework.subjectId 
    })
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4 bg-base-100 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-primary/20">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <Book className="h-5 w-5 mt-1 text-primary" />
          <div className="flex-1">
            <h3 className="font-medium">{homework.text}</h3>
            <p className="text-sm opacity-70">Due: {formatDate(homework.todo)}</p>
          </div>
        </div>
        <button 
          onClick={handleComplete}
          className="btn btn-circle btn-sm btn-success"
          title="Mark as complete"
        >
          <Check className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default HomeworkItem;