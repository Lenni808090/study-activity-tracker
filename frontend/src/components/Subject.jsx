import { useState, useEffect } from "react";
import { useSubjectStore } from "../store/useSubjectStore";
import { Plus, X } from "lucide-react";
import SubjectItem from "./SubjectItem";

const Subject = () => {
  const [newSubjectName, setNewSubjectName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { subjects, getSubjects, createSubject } = useSubjectStore();

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  const handleCreateSubject = async (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    await createSubject({ name: newSubjectName });
    setNewSubjectName("");
    setShowForm(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div className="flex justify-end items-center">
        <button 
          onClick={() => setShowForm(!showForm)} 
          className={`btn btn-circle btn-primary ${showForm ? 'rotate-45' : ''} transition-transform duration-300`}
        >
          {showForm ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </button>
      </div>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showForm ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <form onSubmit={handleCreateSubject} className="flex flex-col gap-4 pt-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Subject Name</span>
            </label>
            <input
              type="text"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              placeholder="Enter subject name"
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary mt-2">
            Add Subject
          </button>
        </form>
        <div className="divider"></div>
      </div>

      <div className="flex flex-col gap-4">
        {subjects.length > 0 ? (
          subjects.map((subject) => (
            <SubjectItem key={subject._id} subject={subject} />
          ))
        ) : (
          <p className="text-center p-6 bg-base-200 rounded-lg opacity-70 text-lg">
            No subjects yet. Add your first subject!
          </p>
        )}
      </div>
    </div>
  );
};

export default Subject;