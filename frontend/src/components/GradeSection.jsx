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

  // Calculate averages
    const calculateAverage = (grades = false) => {
      if (grades.length === 0) return "N/A";
      const sum = grades.reduce((acc, grade) => acc + grade.value, 0);
      return (sum / grades.length).toFixed(2);
    };
  
    const writtenAverage = calculateAverage(writtenGrades);
    const spokenAverage = calculateAverage(spokenGrades);
    
    const totalAverage = grades.length > 0
      ? ((parseFloat(writtenAverage) * 2 + parseFloat(spokenAverage)) / 3).toFixed(2)
      : "N/A";

  const getGradeColor = (grade) => {
    if (grade === "N/A") return "bg-base-100";
    const numGrade = parseFloat(grade);
    if (numGrade <= 2) return "bg-success text-success-content";
    if (numGrade <= 3) return "bg-info text-info-content";
    if (numGrade <= 4) return "bg-warning text-warning-content";
    return "bg-error text-error-content";
  };

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
        <div className={`p-4 rounded-lg ${getGradeColor(totalAverage)}`}>
          <h3 className="text-sm mb-1">Total Average</h3>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Written Grades Table */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg mb-4">Written Grades</h3>
          {writtenGrades.length > 0 ? (
            writtenGrades.map((grade, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-base-100 rounded-lg"
              >
                <div>
                  <span className="font-medium">
                    {grade.value.toFixed(1)}
                  </span>
                </div>
                <span className="text-sm opacity-70">
                  {new Date(grade.date).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center p-4 bg-base-100 rounded-lg opacity-70">
              No written grades yet
            </p>
          )}
        </div>

        {/* Spoken Grades Table */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg mb-4">Spoken Grades</h3>
          {spokenGrades.length > 0 ? (
            spokenGrades.map((grade, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-base-100 rounded-lg"
              >
                <div>
                  <span className="font-medium">
                    {grade.value.toFixed(1)}
                  </span>
                </div>
                <span className="text-sm opacity-70">
                  {new Date(grade.date).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center p-4 bg-base-100 rounded-lg opacity-70">
              No spoken grades yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GradeSection;