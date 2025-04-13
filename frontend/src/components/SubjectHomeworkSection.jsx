import { useEffect, useState } from "react";
import { useHomeworkStore } from "../store/useHomeworkStore";
import HomeworkItem from "./subjectHomeworkItem";
import { Plus } from "lucide-react";

const SubjectHomework = ({ subjectId }) => {
  const { homework, getHomework, addHomework } = useHomeworkStore();
  const [showForm, setShowForm] = useState(false);
  const [newHomework, setNewHomework] = useState({
    text: "",
    todo: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (subjectId) {
      getHomework(subjectId);
    }
  }, [subjectId, getHomework]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addHomework({
      subjectId,
      text: newHomework.text,
      todo: newHomework.todo
    });
    setNewHomework({ text: "", todo: new Date().toISOString().split('T')[0] });
    setShowForm(false);
  };

  return (
    <div className="mt-6 bg-base-200 p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Subject Homework</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`btn btn-circle btn-primary ${showForm ? 'rotate-45' : ''} transition-transform duration-300`}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Homework Description</span>
              </label>
              <input
                type="text"
                value={newHomework.text}
                onChange={(e) => setNewHomework({ ...newHomework, text: e.target.value })}
                placeholder="Enter homework description"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due Date</span>
              </label>
              <input
                type="date"
                value={newHomework.todo}
                onChange={(e) => setNewHomework({ ...newHomework, todo: e.target.value })}
                className="input input-bordered"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-2">
              Add Homework
            </button>
          </div>
        </form>
      )}

      {homework && homework.length > 0 ? (
        <div className="space-y-3">
          {homework.map((hw) => (
            <HomeworkItem key={hw.homeworkId} homework={hw} />
          ))}
        </div>
      ) : (
        <div className="text-center p-4 bg-base-100 rounded-lg">
          <p>No homework for this subject.</p>
        </div>
      )}
    </div>
  );
};

export default SubjectHomework;