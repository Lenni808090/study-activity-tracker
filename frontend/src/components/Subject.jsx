import { useState, useEffect } from "react";
import { useSubjectStore } from "../store/useSubjectStore";
import { Plus } from "lucide-react";
import SubjectItem from "./SubjectItem";

const Subject = () => {
  const [newSubjectName, setNewSubjectName] = useState("");
  const { subjects, getSubjects, createSubject } = useSubjectStore();

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  const handleCreateSubject = async (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    await createSubject({ name: newSubjectName });
    setNewSubjectName("");
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
          <SubjectItem key={subject._id} subject={subject} />
        ))}
      </div>
    </div>
  );
};

export default Subject;