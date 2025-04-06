import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSubjectStore } from "../store/useSubjectStore";
import { ArrowLeft, Plus, X } from "lucide-react";
import Timer from "../components/Timer";
import { useHomeworkStore } from "../store/useHomeworkStore";
import HomeworkItem from "../components/subjectHomeworkItem";

const TimerPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { subjects, getSubjects } = useSubjectStore();
  const { homework, getHomework, addHomework } = useHomeworkStore();
  const [subject, setSubject] = useState(null);
  const [homeworkText, setHomeworkText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getSubjects();
    if (subjectId) {
      getHomework(subjectId);
    }
  }, [getSubjects, getHomework, subjectId]);

  useEffect(() => {
    if (subjects.length > 0 && subjectId) {
      const foundSubject = subjects.find((s) => s._id === subjectId);
      setSubject(foundSubject);
    }
  }, [subjects, subjectId]);

  const handleAddHomework = (e) => {
    e.preventDefault();
    if (!homeworkText.trim() || !dueDate) return;
    
    addHomework({
      subjectId,
      text: homeworkText,
      todo: new Date(dueDate).toISOString(),
    }).then(() => {
      // Refresh the homework list after adding
      getHomework(subjectId);
    });
    
    setHomeworkText("");
    setDueDate("");
    setShowForm(false);
  };

  if (!subject) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-base-100 to-base-300 pt-16">
        <div className="container mx-auto px-4 pt-10 flex justify-center items-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-base-100 to-base-300 pt-16">
      <div className="container mx-auto px-4 pt-10">
        <button
          onClick={() => navigate("/")}
          className="btn btn-ghost gap-2 hover:-translate-x-2 transition-transform absolute top-20 left-4"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        <div className="flex flex-col items-center justify-center gap-8 pt-10">
          <h1 className="text-4xl font-bold">{subject.name}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            <div className="flex flex-col items-center gap-6 p-6 bg-base-200 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold">Timer</h2>
              <Timer subjectId={subjectId} />
            </div>

            <div className="flex flex-col gap-6 p-6 bg-base-200 rounded-xl shadow-md relative">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Homework</h2>
                <button 
                  onClick={() => setShowForm(!showForm)} 
                  className={`btn btn-circle btn-primary ${showForm ? 'rotate-45' : ''} transition-transform duration-300`}
                >
                  {showForm ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                </button>
              </div>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showForm ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <form onSubmit={handleAddHomework} className="flex flex-col gap-4 pt-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Homework Description</span>
                    </label>
                    <input
                      type="text"
                      value={homeworkText}
                      onChange={(e) => setHomeworkText(e.target.value)}
                      placeholder="Enter homework description"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Due Date</span>
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  
                  <button type="submit" className="btn btn-primary mt-2">
                    Add Homework
                  </button>
                </form>
                <div className="divider"></div>
              </div>
              
              <div className="flex flex-col gap-3 overflow-y-auto max-h-60">
                <h3 className="font-medium text-lg">Current Homework</h3>
                {homework.length > 0 ? (
                  homework.map((hw) => (
                    <HomeworkItem key={hw.homeworkId} homework={hw} />
                  ))
                ) : (
                  <p className="text-center opacity-70">No homework yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerPage;