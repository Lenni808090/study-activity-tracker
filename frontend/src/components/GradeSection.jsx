import { useState } from "react";
import { useGradeStore } from "../store/useGradeStore";
import { Plus } from "lucide-react";

const GradeSection = ({ subjectId }) => {
  const [showForm, setShowForm] = useState(false);
  const [gradeType, setGradeType] = useState("written");
  const [gradeValue, setGradeValue] = useState("");
  const { grades, saveWrittenGrade, saveSpokenGrade } = useGradeStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      subjectId,
      grade: parseFloat(gradeValue),
    };

    if (gradeType === "written") {
      await saveWrittenGrade(data);
    } else {
      await saveSpokenGrade(data);
    }

    setGradeValue("");
    setShowForm(false);
  };

  // Calculate averages
  const writtenGrades = grades.filter((g) => g.type === "written");
  const spokenGrades = grades.filter((g) => g.type === "spoken");

  const calculateAverage = (grades, isWritten = false) => {
    if (grades.length === 0) return "N/A";
    const sum = grades.reduce((acc, grade) => acc + grade.value, 0);
    return ((sum * (isWritten ? 2 : 1)) / (grades.length * (isWritten ? 2 : 1))).toFixed(2);
  };

  const writtenAverage = calculateAverage(writtenGrades, true);
  const spokenAverage = calculateAverage(spokenGrades);
  
  const totalAverage = grades.length > 0
    ? (((writtenGrades.reduce((acc, g) => acc + g.value, 0) * 2) + 
        spokenGrades.reduce((acc, g) => acc + g.value, 0)) / 
        ((writtenGrades.length * 2) + spokenGrades.length)).toFixed(2)
    : "N/A";

  return (
    <div className="bg-base-200 p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Grades</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`btn btn-circle btn-primary ${showForm ? 'rotate-45' : ''} transition-transform duration-300`}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      {/* Averages Display */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-base-100 p-4 rounded-lg">
          <h3 className="text-sm opacity-70 mb-1">Written Average</h3>
          <p className="text-2xl font-bold">{writtenAverage}</p>
        </div>
        <div className="bg-base-100 p-4 rounded-lg">
          <h3 className="text-sm opacity-70 mb-1">Spoken Average</h3>
          <p className="text-2xl font-bold">{spokenAverage}</p>
        </div>
        <div className="bg-base-100 p-4 rounded-lg">
          <h3 className="text-sm opacity-70 mb-1">Total Average</h3>
          <p className="text-2xl font-bold">{totalAverage}</p>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-4">
            <select
              value={gradeType}
              onChange={(e) => setGradeType(e.target.value)}
              className="select select-bordered flex-1"
            >
              <option value="written">Written</option>
              <option value="spoken">Spoken</option>
            </select>
            <input
              type="number"
              value={gradeValue}
              onChange={(e) => setGradeValue(e.target.value)}
              placeholder="Enter grade (1-6)"
              className="input input-bordered flex-1"
              min="1"
              max="6"
              step="0.1"
              required
            />
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {grades.length > 0 ? (
          grades.map((grade, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-base-100 rounded-lg"
            >
              <div>
                <span className="font-medium">
                  {grade.value.toFixed(1)}
                </span>
                <span className="ml-2 opacity-70 text-sm">
                  ({grade.type})
                </span>
              </div>
              <span className="text-sm opacity-70">
                {new Date(grade.date).toLocaleDateString()}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center p-4 bg-base-100 rounded-lg opacity-70">
            No grades yet. Add your first grade!
          </p>
        )}
      </div>
    </div>
  );
};

export default GradeSection;