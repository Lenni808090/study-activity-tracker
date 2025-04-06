import { useState, useEffect } from "react";
import { useSubjectStore } from "../store/useSubjectStore";
import { useTimerStore } from "../store/useTimerStore";
import { Plus, Play, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Subject = () => {
  const navigate = useNavigate();
  const [newSubjectName, setNewSubjectName] = useState("");
  const { subjects, getSubjects, createSubject, deleteSubject} = useSubjectStore();
  const { isRunning, stopTimer, resetTimer } = useTimerStore();
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  const handleCreateSubject = async (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    await createSubject({ name: newSubjectName });
    setNewSubjectName("");
  };

  const handleDeleteSubject = async (subjectId) => {
    await deleteSubject({ subjectId });
    if (selectedSubject?._id === subjectId) {
      setSelectedSubject(null);
      if (isRunning) {
        stopTimer();
        resetTimer();
      }
    }
  };

 
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <form onSubmit={handleCreateSubject} className="flex gap-2">
        <input
          type="text"
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
          placeholder="Enter subject name"
          className="input input-bordered flex-1"
        />
        <button type="submit" className="btn btn-primary">
          <Plus className="h-5 w-5" />
          Add
        </button>
      </form>

      <div className="flex flex-col gap-3">
        {subjects.map((subject) => (
          <div
            key={subject._id}
            onClick={() => navigate(`/timer/${subject._id}`)}
            className="flex items-center justify-between p-4 rounded-lg bg-base-200 cursor-pointer hover:bg-base-300"
          >
            <div className="flex flex-col">
              <span className="font-semibold">{subject.name}</span>
              <span className="text-sm opacity-70">
                Study time: {Math.floor(subject.studyDuration / (60 * 60 * 1000))}h{" "}
                {Math.floor((subject.studyDuration / (60 * 1000)) % 60)}m{" "}
                {Math.floor((subject.studyDuration / 1000) % 60)}s
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subject;