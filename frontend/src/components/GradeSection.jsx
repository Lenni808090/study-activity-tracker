import { useState, useEffect } from "react";
import { useGradeStore } from "../store/useGradeStore";
import { Plus, X, BookOpen } from "lucide-react";

const GradeSection = ({ subjectId }) => {
  const { grades, getGrades, saveWrittenGrade, saveSpokenGrade } = useGradeStore();
  const [showForm, setShowForm] = useState(false);
  const [gradeType, setGradeType] = useState("written");
  const [gradeValue, setGradeValue] = useState("");
  // Remove gradeDescription state

  useEffect(() => {
    if (subjectId) {
      getGrades(subjectId);
    }
  }, [subjectId, getGrades]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const gradeData = {
      subjectId,
      grade: parseFloat(gradeValue)
    };

    if (gradeType === "written") {
      saveWrittenGrade(gradeData);
    } else {
      saveSpokenGrade(gradeData);
    }

    // Reset form
    setGradeValue("");
    setShowForm(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-base-200 rounded-xl shadow-md relative">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Grades</h2>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className={`btn btn-circle btn-primary ${showForm ? 'rotate-45' : ''} transition-transform duration-300`}
        >
          {showForm ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </button>
      </div>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showForm ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Grade Type</span>
            </label>
            <select 
              className="select select-bordered w-full"
              value={gradeType}
              onChange={(e) => setGradeType(e.target.value)}
              required
            >
              <option value="written">Written</option>
              <option value="spoken">Spoken</option>
            </select>
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Grade</span>
            </label>
            <input
              type="number"
              min="1"
              max="6"
              step="0.1"
              value={gradeValue}
              onChange={(e) => setGradeValue(e.target.value)}
              placeholder="Enter grade (1-6)"
              className="input input-bordered w-full"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary mt-2">
            Add Grade
          </button>
        </form>
        <div className="divider"></div>
      </div>
      
      <div className="flex flex-col gap-3 overflow-y-auto max-h-60">
        <h3 className="font-medium text-lg">Your Grades</h3>
        {grades && grades.length > 0 ? (
          <div className="space-y-3">
            {grades.map((grade, index) => (
              <div key={index} className="p-4 bg-base-100 rounded-lg shadow-md border border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <p className="text-sm opacity-70">
                      {grade.type === 'written' ? 'Written' : 'Spoken'} • {formatDate(grade.date)}
                    </p>
                  </div>
                  <span className={`badge text-lg font-bold ${parseFloat(grade.value) >= 5 ? 'badge-error' : parseFloat(grade.value) >= 3.5 ? 'badge-warning' : 'badge-success'}`}>
                    {grade.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center opacity-70">No grades yet</p>
        )}
      </div>
    </div>
  );
};

export default GradeSection;