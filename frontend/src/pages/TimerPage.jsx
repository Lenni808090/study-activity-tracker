import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Timer from "../components/Timer";
import { ArrowLeft, Trash } from "lucide-react";
import { useSubjectStore } from "../store/useSubjectStore";
import { useTimerStore } from "../store/useTimerStore";

const TimerPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { subjects, getSubjects, deleteSubject } = useSubjectStore();
  const { resetTimer, stopTimer, isRunning } = useTimerStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  useEffect(() => {
    getSubjects();
  }, []);

  const handleBack = () => {
    if (isRunning) {
      stopTimer();
    }
    resetTimer();
    navigate("/");
  };

  const handleDelete = async () => {
    if (isRunning) {
      stopTimer();
    }
    resetTimer();
    await deleteSubject({ subjectId });
    navigate("/");
  };

  const subject = subjects.find(s => s._id === subjectId);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-base-100 to-base-300 animate-gradient-x">
      <div className="container mx-auto px-4 pt-10">
        <div className="flex justify-between items-center absolute top-20 left-4 right-4">
          <button 
            onClick={handleBack} 
            className="btn btn-ghost gap-2 hover:-translate-x-2 transition-transform"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
          <button 
            onClick={() => setShowDeleteModal(true)} 
            className="btn btn-error btn-outline gap-2"
          >
            <Trash className="h-5 w-5" />
            Delete Subject
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 pt-20 animate-fade-in">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 animate-slide-down">{subject?.name}</h1>
            <p className="text-base-content/60 animate-fade-in delay-200">
              Track your study time for {subject?.name}
            </p>
          </div>
          
          <div className="w-full max-w-md transform hover:scale-[1.02] transition-transform">
            <Timer subjectId={subjectId} />
          </div>
        </div>
      </div>

      {/* Delete Warning Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-200 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-bold mb-4">Delete Subject</h3>
            <p className="mb-6">Are you sure you want to delete "{subject?.name}"? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button 
                className="btn btn-ghost"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-error"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerPage;